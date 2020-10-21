class Robot {
  constructor() {
    this.location = {
      x: '',
      y: '',
    }
    this.facing = ''
    this.isRobotPlaced = false
    this.commandsHistory = []
  }

  getCommandsHistory() {
    return this.commandsHistory
  }

  getFacing() {
    return this.facing
  }
  setFacing(newFacing) {
    return (this.facing = newFacing)
  }

  commandsLog(command) {
    return this.commandsHistory.push(command)
  }
}
