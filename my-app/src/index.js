/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


function renderApp (newAppState, oldAppState = {}) {
  if (newAppState === oldAppState) return
  console.log('render app...')
  renderTitle(newAppState.title, oldAppState.title)
  renderContent(newAppState.content, oldAppState.content)
}

function renderTitle (newTitle, oldTitle = {}) {
  if (newTitle === oldTitle) return
  console.log('render title...')
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = newTitle.text
  titleDOM.style.color = newTitle.color
}

function renderContent (newContent, oldContent = {}) {
  if (newContent === oldContent) return
  console.log('render content...')
  const contentDOM = document.getElementById("content")
  contentDOM.innerHTML = newContent.text
  contentDOM.style.color = newContent.color
}

function themeReducer (state, action) {
  if (!state) return {
    themeName: 'Red Theme',
    themeColor: 'red'
  }
  switch (action.type) {
    case 'UPATE_THEME_NAME':
      return { ...state, themeName: action.themeName }
    case 'UPATE_THEME_COLOR':
      return { ...state, themeColor: action.themeColor }
    default:
      return state
  }
}

function reducer (state, action) {
  if (!state) {
    return {
      title: {
        text: "Book title",
        color: "red",
      },
      content: {
        text: "Book content",
        color: "blue",
      }
    }
  }
  switch (action.type) {
    case "UPDATE_TITLE_TEXT":
      return {
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      }
    case "UPDATE_TITLE_COLOR":
      return {
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      }
    default:
      return state
  }
}

function createStore (reducer) {
  let state = null
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }
  dispatch()
  return { getState, dispatch , subscribe}
}

const store = createStore(reducer)
let oldState = store.getState()
store.subscribe(() => {
  const newState = store.getState()
  renderApp(newState, oldState)
  oldState = newState
})

renderApp(store.getState())
store.dispatch({ type: "UPDATE_TITLE_TEXT", text: "New Title"})
store.dispatch({ type: "UPDATE_TITLE_COLOR", color: "green"})
