let userInput = document.querySelector('#user-input')
let runBtn = document.querySelector('.run-btn')
let restartBtn = document.querySelector('.restart-btn')
let commandsLog = document.querySelector('.commands-log')
let currentPosition = document.querySelector('.current-position')
let reportDiv = document.querySelector('.report-div')
let logTitle = document.querySelector('.log-title')
let errorMsg = document.querySelector('.error-msg')
let reportPosition = document.querySelector('.report-position')

let tableSize = {
  min: 0,
  max: 4,
}

isFacingValid = (facing) => {
  return (
    facing === 'NORTH' ||
    facing === 'EAST' ||
    facing === 'SOUTH' ||
    facing === 'WEST'
  )
}

isPositionValid = (position) => {
  return position >= tableSize.min && position <= tableSize.max
}

commandIsValid = (command) => {
  return (
    command === 'MOVE' ||
    command === 'LEFT' ||
    command === 'RIGHT' ||
    command === 'REPORT'
  )
}

let robot = new Robot()

handleRunBtnClick = () => {
  reportDiv.style.display = 'none'
  let currentCommand = userInput.value.toUpperCase()

  if (!robot.isRobotPlaced && !currentCommand.startsWith('PLACE')) {
    errorMsg.innerHTML = 'Please start with command "PLACE X, Y, F"'
  } else {
    robot.isRobotPlaced = true

    if (currentCommand.includes('PLACE')) {
      let newPosition = currentCommand.split(',')
      let xPosition = Number(newPosition[0].trim().slice(-1))
      let yPosition = Number(newPosition[1].trim())
      let newFacing = newPosition[2].trim()

      if (
        isPositionValid(xPosition) &&
        isPositionValid(yPosition) &&
        isFacingValid(newFacing)
      ) {
        errorMsg.innerHTML = ''
        robot.location = {
          x: xPosition,
          y: yPosition,
        }
        robot.facing = newFacing
        robot.commandsLog(currentCommand)
        logTitle.style.display = 'inherit'
        reportDiv.style.display = 'inherit'
        commandsLog.innerHTML += `${currentCommand}<br/>`
      } else {
        errorMsg.innerHTML = 'Wrong command.'
        reportDiv.style.display = 'inherit'
      }
    } else if (commandIsValid(currentCommand)) {
      let direction = robot.getFacing()
      switch (currentCommand) {
        case 'MOVE':
          if (direction == 'NORTH' && robot.location.y < tableSize.max) {
            robot.location.y += 1
          } else if (direction == 'EAST' && robot.location.x < tableSize.max) {
            robot.location.x += 1
          } else if (direction == 'SOUTH' && robot.location.y > tableSize.min) {
            robot.location.y -= 1
          } else if (direction == 'WEST' && robot.location.x > tableSize.min) {
            robot.location.x -= 1
          } else {
            errorMsg.innerHTML = 'Cannot move in this direction'
          }
          break

        case 'REPORT':
          errorMsg.innerHTML = ''
          reportPosition.style.display = 'inherit'

          currentPosition.textContent = `${robot.location.x}, ${robot.location.y}, ${robot.facing}`
          break

        case 'LEFT':
          if (direction == 'NORTH') {
            robot.setFacing('WEST')
          } else if (direction == 'EAST') {
            robot.setFacing('NORTH')
          } else if (direction == 'SOUTH') {
            robot.setFacing('EAST')
          } else if (direction == 'WEST') {
            robot.setFacing('SOUTH')
          }
          break

        case 'RIGHT':
          if (direction == 'NORTH') {
            robot.setFacing('EAST')
          } else if (direction == 'EAST') {
            robot.setFacing('SOUTH')
          } else if (direction == 'SOUTH') {
            robot.setFacing('WEST')
          } else if (direction == 'WEST') {
            robot.setFacing('NORTH')
          }
          break
      }

      robot.commandsLog(currentCommand)

      logTitle.style.display = 'inherit'
      reportDiv.style.display = 'inherit'
      commandsLog.innerHTML += `${currentCommand}<br/>`
    } else {
      errorMsg.innerHTML = 'Wrong command. Try again.'

      reportDiv.style.display = 'inherit'
    }
  }
  userInput.value = ''
}

handleRestartBtnClick = () => {
  userInput.value = ''
  robot.isRobotPlaced = false
  robot.commandsHistory = []
  reportDiv.style.display = 'none'
  reportPosition.style.display = 'none'
  logTitle.style.display = 'none'
  commandsLog.innerHTML = ''
  errorMsg.innerHTML = ''
}

runBtn.addEventListener('click', handleRunBtnClick)
restartBtn.addEventListener('click', handleRestartBtnClick)
