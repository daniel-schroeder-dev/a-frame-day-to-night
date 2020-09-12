# Day To Night

Day To Night is an A-Frame component that simulates the transition between day and night.

## Installation

Include the component file in the head of your HTML document:

```html
<script type="text/javascript" src="dayToNight.js"></script>
```

## Usage

```html
<a-sky 
  day-to-night="
    duration: 5; 
    startColor: rgb(210, 243, 229); 
    endColor: rgb(128, 66, 61);
  " 
  material="fog: false;"
>
</a-sky>

<!-- if using aframe-environment-component, be sure to set the skyType to 'none' -->
<a-entity id="environment" environment="preset: forest; skyType: none;"></a-entity>

```
![](day-to-night.gif)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)
