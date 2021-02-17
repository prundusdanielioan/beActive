const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const eventFileName = './events.json'
const addEvent = (title,day, month,year) => {
    const events = JSON.parse(loadEvents())
    // const duplicateNote = events.find((event) => (event.title === title))
    const duplicateNote = events.find((event) => (
        (event.details.title === title && event.start.month === month && event.start.day === day && event.start.year === year)
        ))

    if (!duplicateNote) {
        events.push({
            details: {title: title, id: uuidv4(), completed:0},
            start: { time: '12:00pm', month: month, day: day, year: year },
            end: { time: '12:00pm', month: month, day: day, year: year },
                })
        saveEvents(events)
       

        // console.log(data.day);
        
    } 
   return events
}

const removeEvent = (id) => {
    const events = JSON.parse(loadEvents())
    console.log(events);
    const eventsToKeep = events.filter((event) => event.details.id !== id)
    // console.log(eventsToKeep)
    if (events.length > eventsToKeep.length) {
        saveEvents(eventsToKeep)
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