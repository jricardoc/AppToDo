import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskWithSameTitle = tasks.find(task => task.title === newTaskTitle)

    if (taskWithSameTitle) {
      return Alert.alert('Task já cadastrada', 'você não pode cadastrar task com o mesmo nome')
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldTasks => [...oldTasks, newTask])

    // Essa função foi criada para adicionar uma nova Task. Dentro do corpo dela, podemos perceber
    // que recebe uma 'id' do tipo Number, 'title' do tipo String e 'done' do tipo Boolean que recebe
    // um valor falso porque a Taks ainda não foi cumprida, ela está sendo adicionada. 
    // Logo abaixo temos o setTasks que executa o trabalho de concatenação. Ele pega o valor antigo, e 
    // adiciona a uma array de tasks. 
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));

    const taskToBeMarkedAsDone = updatedTasks.find(task => task.id === id);


    if (!taskToBeMarkedAsDone)
      return;

    taskToBeMarkedAsDone.done = !taskToBeMarkedAsDone.done;
    setTasks(updatedTasks);

    // Dessa forma foi colocado um map para retornar um spred do objeto
    // Pesquisar Shallow Copy em JavaScript
    //TODO - toggle task done if exists
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      {
        style: 'cancel',
        text: 'Não'
      },
      {
        style: 'destructive',
        text: 'Sim',
        onPress: () => {
          const updatedTasks = tasks.filter(task => task.id !== id);

          setTasks(updatedTasks);
        }
      }
    ])

    // Se o id que está sendo recebido for o id que é diferente desta Task que está sendo passada agora,
    // ele irá retornar para o updatedTasks, se for igual, ele vai atender o filtro e não vai retornar. Ou seja
    // será apagado.

    //TODO - remove task from state
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    const updatedTasks = tasks.map(task => ({ ...task }));

    const taskToBeUpdated = updatedTasks.find(task => task.id === taskId);


    if (!taskToBeUpdated)
      return;

    taskToBeUpdated.title = taskNewTitle;
    
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})