# Folder Tree Challenge

The purpose of the program is create a folder structure hierarchically. You must provide a list of commands (CREATE, LIST, MOVE, DELETE) to interact with the folder tree.

## Demo

You must create a list of commands to be performed by the program. The list could be similar to this:

```
  CREATE movies
  CREATE foods
  CREATE foods/fruits
  CREATE movies/heroes
  CREATE foods/fruits/deadpool
  CREATE foods/fruits/apples
  CREATE foods/fruits/bananas/yellow
  LIST
  DELETE foods/fruits/apples
  MOVE foods/fruits/deadpool movies/heroes/deadpool
  LIST
```

Once you run the application following the instructions in the next sections of this document, you'll se something similar in your console:

```

movies
  heroes
foods
  fruits
    deadpool
    apples
    bananas
      yellow

movies
  heroes
    deadpool
foods
  fruits
    bananas
      yellow
```

## Requirements

There are some necessary tools we must have installed in the machine to run the application succesfully.

- NodeJS [(Installation Guide)](https://nodejs.org/en)

## Running the app

Copy the next commands in your terminal to run the application

1. Install project dependencies

```js
  npm install
```

2. Create the application build

```
  npm run build
```

3. Run the application

```
  npm run start
```

### Custom instructions

In case you want to specify your own instructions, open the `src/index.ts` and modify the `data` variable.

## Testing

If you want to read the unit tests and comprehend the conditions considered for this program, you can find them in the `src/__tests__` folder. If you only want to run the tests and make sure all of them are passing, run the next command:

```
  npm run test
```

In addition, you can see the coverage report running the command below:

```
  npm run test:coverage
```

You can open the `index.html` file placed in the `coverage/lcov-report` folder, in case you want to see the report in a more user-friendly interface.
