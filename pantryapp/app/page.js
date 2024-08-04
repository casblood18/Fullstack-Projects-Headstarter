'use client';
import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  query,
} from 'firebase/firestore';
import { db } from './firebase';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Home() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '' });
  const [total, setTotal] = useState(0);

  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== '' && newItem.price !== '') {
      await addDoc(collection(db, 'items'), {
        name: newItem.name.trim(),
        price: newItem.price,
      });
      setNewItem({ name: '', price: '' });
    }
  };

  useEffect(() => {
    const q = query(collection(db, 'items'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);

      const calculateTotal = () => {
        const totalPrice = itemsArr.reduce(
          (sum, item) => sum + parseFloat(item.price),
          0
        );
        setTotal(totalPrice);
      };
      calculateTotal();

      return () => unsubscribe();
    });
  }, []);

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'items', id));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Pantry Tracker
      </Typography>
      <Box sx={{ bgcolor: 'white', p: 2, borderRadius: 1 }}>
        <form onSubmit={addItem}>
          <TextField
            label="Item Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price ($)"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            type="number"
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Add Item
          </Button>
        </form>
        <List sx={{ mt: 2, bgcolor: "white" }}>
          {items.map((item) => (
            <ListItem
              key={item.id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(item.id)}>
                  <DeleteIcon />
                </IconButton>
              }
              sx={{ color: 'white' }} 
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', color: 'gray' }}>
                <Typography variant="body1" sx={{ color: 'black' }}>
                  {item.name}
                </Typography>
                <Typography variant="body1" sx={{ color: 'black' }}>
                  ${item.price}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
        {items.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, mt: 2, bgcolor: 'gray', borderRadius: 1 }}>
            <Typography variant="h6" sx={{ color: 'black' }}>Total</Typography>
            <Typography variant="h6" sx={{ color: 'black' }}>${total}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}