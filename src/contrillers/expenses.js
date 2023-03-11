'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getAll = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const expenses = expensesService.getFilteredExpenses(req.query);

  res.send(expenses);
};

const getOne = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { expenseId } = req.params;

  const foundExpense = expensesService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const getFilteredExpenses = (req, res) => {
  const filters = req.query;

  const readyExpenses = expensesService
    .getFilteredExpenses(filters);

  res.send(readyExpenses);
};

const add = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const foundUser = usersService.findById(userId);

  const isValidBody
  = typeof userId === 'number'
    && typeof spentAt === 'string'
    && typeof title === 'string'
    && typeof amount === 'number'
    && typeof note === 'string'
    && typeof category === 'string';

  if (!isValidBody || !foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.create(req.body);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const data = req.body;

  const foundExpense = expensesService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.update(expenseId, data);

  res.send(foundExpense);
};

module.exports = {
  getAll,
  getOne,
  getFilteredExpenses,
  add,
  remove,
  update,
};