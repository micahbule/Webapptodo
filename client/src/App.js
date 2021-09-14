import { Heading } from '@chakra-ui/react';
import ListTodo from './components/ListTodo';
import EditTodo from './components/EditTodo';
import InputTodo from './components/InputTodo';
import { VStack, IconButton, useColorMode } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';

function App() {

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <VStack p={4}>
      <IconButton
        icon={colorMode === 'light' ? <FaSun /> : <FaMoon />}
        isRound='true'
        size='lg'
        alignSelf='flex-end'
        onClick={toggleColorMode}
      />
      <Heading
        mb='8'
        fontWeight='extrabold'
        size='2xl'
        bgGradient='linear(to-r, pink.500, pink.300, blue.500)'
        bgClip='text'
      >
        Todo Application
      </Heading>
      <ListTodo  />
      <InputTodo />
    </VStack>
  );
}

export default App;
