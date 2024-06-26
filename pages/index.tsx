import React, { useState, useEffect } from 'react'
import Head from "next/head";

export default function Home() {
  interface TODO {
    id: number;
    task: string;
    limit: string;
    delFlg: number;
  }
  const [todos, setTodos] = useState<TODO[]>([]);
  const [task, setTask] = useState<string>('');
  const [limit, setLimit] = useState<string>('');

  const addTask = () => {
    const validateMessage = validate();
    if (validateMessage) {
      alert(validateMessage);
      return false;
    };
    setTodos([...todos, {id: todos.length+1, task: task, limit: limit, delFlg: 1}]);
  }

  const todoTable = () => {
    if(todos.filter((t) => t.delFlg == 1).length == 0) {
      return (
      <tr>
        <td className='todo__table--column todo__table--columnNoRecord' colSpan={4}>
          タスクがありません。
        </td>
      </tr>);
    }else {
      return todos.map((todo) => {
        if(todo.delFlg == 1) {
          return (
            <tr key={todo.id} className="todo__table--record">
              <td className="todo__table--column todo__table--columnId">{todo.id}</td>
              <td className="todo__table--column todo__table--columnTask">{todo.task}</td>
              <td className="todo__table--column todo__table--columnLimit">{todo.limit}</td>
              <td className="todo__table--column todo__table--columnDelete">
                <button type='button'
                  onClick={() => {
                    todos.find(t => t.id == todo.id)!.delFlg = 2;
                    setTodos([...todos]);
                  }}>
                  削除
                </button>
              </td>
            </tr>
          );
        };
      });
    }
  }

  const validate = ():string => {
    let messages:string = '';

    if(!task) {
      messages += '・タスクは必須項目です。\n';
    }

    if(!limit) {
      messages += '・期日は必須項目です。\n';
    }

    return messages;
  }

  return (
    <>
      <Head>
        <title>TODO</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="todo">
          <form className="todo__form">
            <input type="text" value={task}
              onChange={(e) => setTask(e.target.value)}
              className="todo__form--text" />
            <input type="date" value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="todo__form--date" />
            <button type='button'
              className="todo__form--button"
              onClick={() => addTask()}>
                追加
            </button>
          </form>
          <table className="todo__table">
            <thead className="todo__table--header">
              <tr className="todo__table--record">
                <td className="todo__table--column todo__table--columnId">ID</td>
                <td className="todo__table--column todo__table--columnTask">タスク</td>
                <td className="todo__table--column todo__table--columnLimit">期限</td>
                <td className="todo__table--column todo__table--columnDelete"></td>
              </tr>
            </thead>
            <tbody className="todo__table--body">
              {todoTable()}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
