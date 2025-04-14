import { Outcome, makeSuccess, makeError } from 'ts-outcome';

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

type User = {
  id: number;
  name: string;
};

/**
 * Simulate an API call where we hardcode the user id. ID 1 is valid. Any other
 * id is an error.
 */
async function fetchUser(userId: number): Promise<Outcome<User, NotFoundError>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (userId === 1) {
        resolve(makeSuccess({ id: 1, name: 'Ada' }));
      } else {
        resolve(makeError(new NotFoundError('User not found')));
      }
    }, 100);
  });
}

async function main() {
  console.log('Fetching user with id 1...');
  const userResult = await fetchUser(1);
  if (userResult.isSuccess) {
    // userResult.value is of type User
    console.log('Successfully fetched user:', userResult.value);
  } else {
    // userResult.error is of type NotFoundError
    console.error('Failed to fetch user:', userResult.error.message);
  }

  console.log('Fetching user with id 2...');
  const userResult2 = await fetchUser(2);
  if (userResult2.isSuccess) {
    // userResult2.value is of type User
    console.log('Successfully fetched user:', userResult2.value);
  } else {
    // userResult2.error is of type NotFoundError
    console.error('Failed to fetch user:', userResult2.error.message);
  }
}

main().catch(console.error);
