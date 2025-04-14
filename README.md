# ts-outcome

A small set of Typescript utils to represent success / failure in a more sane way than throwing errors. 

## Motivation

When working in large TS codebases with colleagues in the past, we've been bitten in deep stacks where some function threw, but someone forgot to handle that with a try-catch. TS doesn't provide a way to document what errors could be thrown by a function. This package draws inspiration from [Rust's Result type](https://doc.rust-lang.org/std/result) and [Go's explicit error handling](https://go.dev/blog/error-handling-and-go) to make error handling explicit in TS.

Go from:

```ts
function parseJson(jsonString: string): UserData {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    throw new Error('Failed to parse JSON');
  }
}

// You need to remember that parseJson can throw an error and try-catch it.
try {
  const userData = parseJson('{"name": "Alice", "age": 30}');
  console.log('User name:', userData.name);
} catch (error) {
  // `error` type is unknown at this point in the code.
  console.error('Failed to parse user data:', error);
}
```

To:

```ts
function parseJson(jsonString: string): Outcome<UserData> {
  try {
    return makeSuccess(JSON.parse(jsonString));
  } catch (e) {
    return makeError(new Error('Failed to parse JSON'));
  }
}

const result = parseJson('{"name": "Alice", "age": 30}');
if (result.isSuccess) {
  // Type narrowing here ensures result.value is UserData type.
  console.log('User name:', result.value.name);
} else {
  // Type narrowing here ensures result.error is an instance of the Error class.
  console.error('Failed to parse user data:', result.error);
}
```

## Installation

```bash
npm install ts-outcome
```

## Usage

TBD

## API

TBD