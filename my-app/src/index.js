import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

let appState = {
  title: {
    text: "Book title",
    color: "red",
  },
  content: {
    text: "Book content",
    color: "blue",
  }
}

function renderApp (appState) {
  renderTitle(appState.title)
  renderContent(appState.content)
}

function renderTitle (title) {
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = title.text
  titleDOM.style.color = title.color
}

function renderContent (content) {
  const contentDOM = document.getElementById("content")
  contentDOM.innerHTML = content.text
  contentDOM.style.color = content.color
}

function stateChanger (action) {
  switch (action.type) {
    case "UPDATE_TITLE_TEXT":
      appState.title.text = action.text
      break
    case "UPDATE_TITLE_COLOR":
      appState.title.color = action.color
      break
    default:2
      break
  }
}

function createStore (state, stateChanger) {
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    stateChanger(state, action)
    listeners.forEach((listener) => listener())
  }
  return { getState, dispatch , subscribe}
}

const store = createStore(appState, stateChanger)
store.subscribe(() => renderApp(store.getState()))

renderApp(store.getState)
store.dispatch({ type: "UPDATE_TITLE_TEXT", text: "New Title"})
store.dispatch({ type: "UPDATE_TITLE_COLOR", color: "green"})
