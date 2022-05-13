# MyFirstReactjs
This is my first trial on Web.\
I am planning to do a sudoku-related project with wave function collasp algorithm.\
I am following a tutorial to learn the basic of react.js\
This will be a tic-tac-toe\
The tutorial can be found here: https://reactjs.org/tutorial/tutorial.html  
<br>

# To-do
### This is suggested follow-up feature by the tutorial

- [x] Display the location for each move in the format (col, row) in the move history list.
- [x] Bold the currently selected item in the move list.
- [x] Rewrite Board to use two loops to make the squares instead of hardcoding them.
- [x] Add a toggle button that lets you sort the moves in either ascending or descending order.
- [x] When someone wins, highlight the three squares that caused the win.
- [x] When no one wins, display a message about the result being a draw.

### Task 1:
Add `clicked` in histroy and whenever `handleClick`, set the `clicked` as `i`. When render Go to move... , append i/3+1 as row and i%3+1 as column

### Task 2:
If `move === this.state.stepNumber` render `<b>disc</b>` else render `disc`

### Task 3:
Create a renderRow function to help render with 2 loops.

### Task 4:
Add `isAscending` to `Game`, and add a button to toggle. if `isAscending` is true, just render histroy, else render histroy.reverse.

### Task 5:
Add `winningSquare` to `Square`. `calculateWinnder` now also return winner line. Set the winnerSquare to true based on winner line. Add square-winning in css file to highline to winning square.

### Task 6:
When render status message, if `stepNumder < 9`, render Next player, else render draw.