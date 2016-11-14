Asserts an array (or array-like object) contains at least one item that satisfies
a given assertion or function.

Notice this assertion fails when given an empty array.

```javascript
expect([0, 1, 2, 3, 4], 'to have an item satisfying', 'to be a number');

expect([0, 1, 2, 3, 4], 'to have an item satisfying', function (item, index) {
    expect(item, 'to be a number');
});

expect(
    [[1], ['foo']],
    'to have an item satisfying',
    'to have an item satisfying',
    'to be a number'
);

expect(
    [-1, -2, 3],
    'to have an item satisfying',
    expect.it('to be a number').and('to be positive')
);
```

In case of a failing expectation you get the following output:

```javascript
expect(
    [ ['0', '1'], ['5', '6'], ['7', '8'] ],
    'to have an item satisfying',
    'to have an item satisfying',
    'to be a number'
);
```

```output
expected array to have an item satisfying to have an item satisfying to be a number
```

Here a another example:

```javascript
expect(
    [0, -1, -2, -3, -4],
    'to have an item satisfying',
    expect.it('to be a number').and('to be positive')
);
```

```output
expected [ 0, -1, -2, -3, -4 ] to have an item satisfying
expect.it('to be a number')
        .and('to be positive')
```
