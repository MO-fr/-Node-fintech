import express from 'express';
import Transaction from '../models/transactions.js'; // Assuming you have a Transaction model
import User from '../models/user.js'; // Assuming you have a User model
import bcrypt from 'bcrypt'

const router = express.Router();

// router.get('/transactions', async (req, res) => {
//   try {
//     const userId = req.user.id; // Assuming user authentication provides `req.user`
//     const transactions = await Transaction.findAll({ where: { user_id: userId } });
//     res.render('transactions', { transactions });
//   } catch (error) {
//     console.error('Error fetching transactions:', error);
//     res.status(500).send('Server error');
//   }
// });



// Root route
router.get('/', (req, res) => {
  res.render('index', { title: 'Home Page' });
});

// // Transaction routes
// router.get('/transactions', async (req, res) => {
//   try {
//     const transactions = await Transaction.findAll();
//     res.render('transactions', { transactions });
//   } catch (error) {
//     console.error('Error fetching transactions:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// });



// router.post('/transactions', async (req, res) => {
//   try {
//     const { amount, description, date } = req.body;
//     const transaction = await Transaction.create({ amount, description, date });
//     res.status(201).json(transaction);
//   } catch (error) {
//     console.error('Error creating transaction:', error);
//     res.status(400).json({ message: 'Error creating transaction', error: error.message });
//   }
// });

// router.delete('/transactions/:id', async (req, res) => {
//   try {
//     const transactionId = req.params.id;
//     const deletedCount = await Transaction.destroy({ where: { id: transactionId } });
//     if (deletedCount === 0) return res.status(404).json({ message: 'Transaction not found' });
//     res.status(204).send();
//   } catch (error) {
//     console.error('Error deleting transaction:', error);
//     res.status(500).json({ message: 'Error deleting transaction', error: error.message });
//   }
// });

// router.put('/transactions/:id', async (req, res) => {
//   try {
//     const transactionId = req.params.id;
//     const { amount, description, date } = req.body;
//     const [updated] = await Transaction.update(
//       { amount, description, date },
//       { where: { id: transactionId } }
//     );
//     if (updated) {
//       const updatedTransaction = await Transaction.findByPk(transactionId);
//       res.status(200).json(updatedTransaction);
//     } else {
//       res.status(404).json({ message: 'Transaction not found' });
//     }
//   } catch (error) {
//     console.error('Error updating transaction:', error);
//     res.status(400).json({ message: 'Error updating transaction', error: error.message });
//   }
// });

// User routes
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.render('users', { users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});



router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  console.log("SERVER::::", username, email, password);
  
  try {
    // Create the user in the database
    const user = await User.create({
      name: "user signup", 
      username: username,
      email: email,
      password_hash: password, // Ensure you hash the password in production
      balance: 7000
    });

    console.log(`User  ${user.username} registered successfully!`);

    // Redirect to dashboard after successful registration
    res.redirect('/dashboard');

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  }
});
  

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Here, you should compare the password with the hashed version
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

// Redirect to dashboard upon successful login
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Render routes for login, register, and dashboard
router.get('/login', (req, res) => {
  res.render('login');
});


export default router;