export default {
	degToRad: function(angle) {
	  return angle * (Math.PI / 180);
	},

	radToDeg: function(rad) {
	  return (180 / Math.PI) * rad;
	},

	random: function(min, max) {
	  return Math.floor(Math.random() * (max - min) + min);
	},
};