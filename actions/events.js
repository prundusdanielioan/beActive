const fs = require('fs')
const eventFileName = './events.json'
const addEvent = (title,data) => {
    const events = JSON.parse(loadEvents())
    data = JSON.parse(JSON.stringify(data))
    const duplicateNote = events.find((event) => (event.title === title))

    if (!duplicateNote) {
        events.push({
            details: {title: title},
            start: { time: '12:00pm', month: data.month, day: data.day, year: data.year },
            start: { time: '12:00pm', month: data.month, day: data.day, year: data.year },
                })
        // saveEvents(events)
        console.log(events)

        console.log(data.day);
        
    } 
}

const removeEvent = (title) => {
    const notes = loadEvents()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }    
}

const listEvents = () => loadEvents()

const saveEvents = (events) => {
    const dataJSON = JSON.stringify(events)
    fs.writeFileSync(eventFileName, dataJSON)
}

const loadEvents = () => {
    try {
        return fs.readFileSync(eventFileName)
    } catch (e) {
        return []
    }
}

module.exports = {
    addEvent: addEvent,
    removeEvent: removeEvent,
    listEvents: listEvents,
}