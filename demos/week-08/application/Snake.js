export default class Snake {
    constructor( game ) {
        this.game = game;

        this.size = 3;
        this.direction = 'Right';
        this.head = {
            x: 1,
            y: 1
        };
        this.tail = [];
    }

    paint( ctx ) {
        const {
            cellSize
        } = this.game.configuration;

        // draw head of snake
        const x = cellSize * this.head.x;
        const y = cellSize * this.head.y;

        ctx.fillStyle = 'black';
        ctx.fillRect( x, y, cellSize, cellSize );

        // @todo Eyes have to be drawn
        // ...

        // draw tail of snake
        ctx.fillStyle = '#777777';
        this.tail.forEach(
            cell => {
                ctx.fillRect( cellSize * cell.x, cellSize * cell.y, cellSize, cellSize );
            }
        )
    }

    getNext() {
        const direction = this.direction;

        switch( direction ) {
            case 'Up':
                return {
                    x: this.head.x,
                    y: this.head.y - 1
                };
            case 'Down':
                return {
                    x: this.head.x,
                    y: this.head.y + 1
                };
            case 'Right':
                return {
                    x: this.head.x + 1,
                    y: this.head.y
                };
            case 'Left':
                return {
                    x: this.head.x - 1,
                    y: this.head.y
                };
        }
    }

    move() {
        // what is the head cell now becomes a tail cell in the next move
        this.tail.push( this.head );

        this.head = this.getNext();

        if( this.tail.length > this.size ) {
            this.tail.shift();
        }
    }

    ateItself() {
        return this.tail.find(
            cell => cell.x === this.head.x && cell.y === this.head.y
        );
    }

    setDirection( direction ) {
        if( direction === 'Up' && this.direction === 'Down' ) {
            return;
        }

        if( direction === 'Down' && this.direction === 'Up' ) {
            return;
        }

        if( direction === 'Left' && this.direction === 'Right' ) {
            return;
        }

        if( direction === 'Right' && this.direction === 'Left' ) {
            return;
        }

        this.direction = direction;
    }

    grow() {
        this.size += 3;
    }
}