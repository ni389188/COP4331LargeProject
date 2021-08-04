const verifiedAccount = require('./login');
const deleted = require('./deleted');
const getrecipes = require('./getrecipes');
const favorites = require('./favorite');
const add = require('./add');

test('verifiedAccount, email = carlantoine@gmail.com password = 123@cA', () =>
{
    expect(verifiedAccount("carlantoine@gmail.com", "123@cA")).toBe(true);
});

test('deleted, userId = 787vfs78v78ssvs7v7s7', () =>
{
    expect(deleted("787vfs78v78ssvs7v7s7")).toBe(true);
});

test('getrecipes, userId = 787vfs78v78ssvs7v7s7', () =>
{
    expect(getrecipes("787vfs78v78ssvs7v7s7")).toBe(true);
});

test('favorites, userId = 787vfs78v78ssvs7v7s7', () =>
{
    expect(favorites("787vfs78v78ssvs7v7s7")).toBe(0);
});

test('add, userId = 787vfs78v78ssvs7v7s7 recipeId = 717282', () =>
{
    expect(add("787vfs78v78ssvs7v7s7", "717282")).toBe(true);
});