const { EventEmitter } = require('events');
class Gym extends EventEmitter {
    timer = null;
    constructor() {
        super();
        this.timer =
            setInterval(() => {
                this.emit('boom');
            }, 1000);
    }
    stop() {
        clearInterval(this.timer);
    }
}
let gym = new Gym();
gym.on('boom', () => {
    console.log('Athlete is working out');
})
setTimeout(() => {
    gym.stop();
}, 10000);
