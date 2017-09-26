/*
	By Osvaldas Valutis, www.osvaldas.info
	Available for use under the MIT License
*/

;( function ( document, window, index )
{
	var s = document.body || document.documentElement, s = s.style, prefixAnimation = '', prefixTransition = '';

	if( s.WebkitAnimation == '' )	prefixAnimation	 = '-webkit-';
	if( s.MozAnimation == '' )		prefixAnimation	 = '-moz-';
	if( s.OAnimation == '' )		prefixAnimation	 = '-o-';

	if( s.WebkitTransition == '' )	prefixTransition = '-webkit-';
	if( s.MozTransition == '' )		prefixTransition = '-moz-';
	if( s.OTransition == '' )		prefixTransition = '-o-';

	Object.prototype.onCSSAnimationEnd = function( callback )
	{
		var runOnce = function( e ){ callback(); e.target.removeEventListener( e.type, runOnce ); };
		this.addEventListener( 'webkitAnimationEnd', runOnce );
		this.addEventListener( 'mozAnimationEnd', runOnce );
		this.addEventListener( 'oAnimationEnd', runOnce );
		this.addEventListener( 'oanimationend', runOnce );
		this.addEventListener( 'animationend', runOnce );
		if( ( prefixAnimation == '' && !( 'animation' in s ) ) || getComputedStyle( this )[ prefixAnimation + 'animation-duration' ] == '0s' ) callback();
		return this;
	};

	Object.prototype.onCSSTransitionEnd = function( callback )
	{
		var runOnce = function( e ){ callback(); e.target.removeEventListener( e.type, runOnce ); };
		this.addEventListener( 'webkitTransitionEnd', runOnce );
		this.addEventListener( 'mozTransitionEnd', runOnce );
		this.addEventListener( 'oTransitionEnd', runOnce );
		this.addEventListener( 'transitionend', runOnce );
		this.addEventListener( 'transitionend', runOnce );
		if( ( prefixTransition == '' && !( 'transition' in s ) ) || getComputedStyle( this )[ prefixTransition + 'transition-duration' ] == '0s' ) callback();
		return this;
	};
}( document, window, 0 ));

export default module;
