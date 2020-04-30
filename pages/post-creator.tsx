import styled from 'styled-components';
import {Layout} from '../components/Layout';
import {useState} from 'react';
import axios from '../axios/axios-blog';
import Head from 'next/head';

const PostCreator = () => {
  let [title, setTitle] = useState<string>('')
  let [body, setBody] = useState<string>('')
 
  const createHandler = () => {
    if (title.trim() && body.trim()) {
      let raw = JSON.stringify({title, body})
      axios.post('/posts', raw, {headers: {"Content-Type": "application/json"}})
        .then(response => console.log(response))
        .catch(err => console.log(err))
      setTitle('')
      setBody('')
    }
  }
  
  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }
  
  const bodyHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value)
  }
  
  const submitHandler = event => {
    event.preventDefault()
  }
  
  return (
    <Layout>
      <Head>
        <title>Create post</title>
      </Head>
      <Form onSubmit={submitHandler}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          placeholder='Enter article title...'
          value={title}
          onChange={titleHandler}
        />
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          cols={30}
          rows={10}
          placeholder='Enter content here...'
          value={body}
          onChange={bodyHandler}
        />
        <Center>
          <Button onClick={createHandler}>Create post</Button>
        </Center>
      </Form>
    </Layout>
  )
}

export default PostCreator

const Form = styled.form`
  border: 1px solid #eaeaea;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  padding: 3rem;
  border-radius: 5px;
  input, textarea {
    display: block;
    width: 100%;
    padding: 1rem;
    margin-top: 0.5rem;
    margin-bottom: 2rem;
    border-radius: 5px;
    border: 2px solid lightgray;
  }
  input:focus, textarea:focus {
    outline: none;
    box-shadow: 0px 0px 3px #000ac8;
    border-radius: 5px;
  }
`

const Button = styled.button`
    border-radius: 5px;
    padding: 1rem 3rem;
    cursor: pointer;
    background: #26a69a;
    text-align: center;
    outline: 0;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
    border: none;
    color: white;
    text-transform: uppercase;
`

const Center = styled.div`
  text-align: center;
`

