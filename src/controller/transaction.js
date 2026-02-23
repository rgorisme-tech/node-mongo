const Transaction = require('../models/Transaction');

const { validationResult } = require('express-validator');

const createTransaction = async (req, res) => {
  try {
    console.log(req.body);
    const {
      wallet,
      paymentCurrency,
      paymentAmount,
      paymentTransaction,
      detailsStage,
      detailsTokenPrice,
      detailsTokenBonus,
      detailsAmount
    } = req.body;

    const newPost = new Transaction({
      user: req.user.id,
      wallet: wallet,
      payment: {
        currency: paymentCurrency,
        amount: paymentAmount,
        transaction: paymentTransaction
      },
      details: {
        stage: detailsStage,
        token_price: detailsTokenPrice,
        token_bonus: detailsTokenBonus,
        amount: detailsAmount
      }
    });
    await newPost.save();
    res.json({
      success: 1
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({
      date: -1
    });
    const allTransactions = await Transaction.find();
    let amount = 0;
    allTransactions.map((t) => {
      amount += t.details.amount;
    });
    console.log('transactions', transactions);

    if (transactions && transactions.length) {
      res.json({
        transactions: transactions,
        amount: amount
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
module.exports = {
  createTransaction,
  getTransactions
};
