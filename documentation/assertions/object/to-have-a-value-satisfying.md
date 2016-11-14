Asserts that an object contains at least one value that satisfies a given
assertion or function.

Notice this assertion fails when given an empty object.

```javascript
expect(
    { foo: 0, bar: 1, baz: 2, qux: 3 },
    'to have a value satisfying',
    'to be a number'
);

expect(
    { foo: 0, bar: 1, baz: 2, qux: 3 },
    'to have a value satisfying',
    function (value, index) {
        expect(value, 'to be a number');
    }
);
```

In case of a failing expectation you get the following output:

```javascript
expect(
    { foo: [10, 11, 12], bar: [14, 15, 16], baz: [17, 18, 19] },
    'to have a value satisfying',
    'to have items satisfying',
    expect.it('to be a number').and('to be below', 8)
);
```

```output
expected object to have a value satisfying
to have items satisfying expect.it('to be a number')
        .and('to be below', 8)
```
