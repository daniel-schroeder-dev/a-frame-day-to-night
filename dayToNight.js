let timeElapsed = 0;
const DOWN = -1;
const UP = 1;
let currentDirection = DOWN;

let RED_START;
let GREEN_START;
let BLUE_START;

let RED_END;
let GREEN_END;
let BLUE_END;

let MAX;

function getRGBMatches(rgbString) {
  const regex = /rgb\((\d+),\s(\d+),\s(\d+)\)/;
  const matches = rgbString.match(regex);
  return matches;
}

AFRAME.registerComponent('day-to-night', {
  schema: {
  	duration: {type: 'number', default: 5},
    startColor: {type: 'string', default: 'rgb(214, 255, 249)'},
    endColor: {type: 'string', default: 'rgb(0, 0, 0)'},
  },
  init: function() {
  
    const startRGBString = this.data.startColor;
    const startMatches = getRGBMatches(startRGBString);
  
    RED_START = +startMatches[1];
    GREEN_START = +startMatches[2];
    BLUE_START = +startMatches[3];
  
    MAX = [RED_START, GREEN_START, BLUE_START].reduce((acc, cur) => cur > acc ? cur : acc, 0);

    const endRGBString = this.data.endColor;
    const endMatches = getRGBMatches(endRGBString);
  
    RED_END = +endMatches[1];
    GREEN_END = +endMatches[2];
    BLUE_END = +endMatches[3];

  },
  tick: function(time, timeDelta) {
  	
    timeElapsed += timeDelta;

  	if (timeElapsed > ((this.data.duration*1000)/MAX)) {
  		
  		timeElapsed = 0;

  		const rgbString = this.el.getAttribute('color') || this.data.startColor;
      const matches = getRGBMatches(rgbString);
  		
  		let red   = +matches[1] + currentDirection;
  		let green = +matches[2] + currentDirection;
  		let blue  = +matches[3] + currentDirection;

  		if (currentDirection == UP) {

  			red   = red   >= RED_START   ? RED_START   : red;
  			green = green >= GREEN_START ? GREEN_START : green;
  			blue  = blue  >= BLUE_START  ? BLUE_START  : blue;

  			if (red == RED_START && green == GREEN_START && blue == BLUE_START) {
  				currentDirection = DOWN;
  			}

  		} else {
  			
  			red   = red   >= RED_END   ? red   : RED_END;
  			green = green >= GREEN_END ? green : GREEN_END;
  			blue  = blue  >= BLUE_END  ? blue  : BLUE_END;

  			if (red == RED_END && green == GREEN_END && blue == BLUE_END) {
  				currentDirection = UP;
  			}

  		}

  		this.el.setAttribute('color' , `rgb(${red}, ${green}, ${blue})`);

  	}
  },
});
