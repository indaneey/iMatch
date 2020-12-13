
"use strict"

/**
* A vanilla JavaScript mobile-friendly before/after comparison slider, <br>
* to view the difference between two images with mouse drag and touch swipe events.
* @function iMatch
* @param { HTML Element Selector } HTML Element Selector
* @returns container Elements
* @inner
*/
class iMatch{
    constructor(selector){
        this.selector = selector
    }

    
/**
* use this method to configure your slider.
* @function compare
* @param {direction & animation} slider properties
* @returns slider Properties
* @inner
*/

    compare({direction = String() || 'horizontal', animation = Boolean, lineClassName = String(), arrowClassName = String()} = {}) {
 
        const container = document.querySelector(this.selector);

        container.style.position = 'relative'
        container.style.overflow = 'hidden'
        container.style.padding = '0px'
        container.style.paddingLeft = '0px'
        container.style.paddingRight = '0px'
        container.style.paddingTop = '0px'
        container.style.paddingDown = '0px'
        container.style.textAlign = 'justify'
        const range = document.getElementById('range')

        var dividerLine
        if(direction != 'horizontal' && direction != 'vertical'){
            direction = 'horizontal'
            
        }
        if(direction.toLowerCase() == 'horizontal' || direction.toLowerCase() == 'vertical'){
            if(direction.toLowerCase() === "horizontal"){
                if(container.children.length == 2){
    
                    if(container.children[0].tagName === 'IMG' && container.children[1].tagName === 'IMG'){
                        const downSpan = document.createElement('downSpan')
                        downSpan.style.cssText = 'position: absolute; width: 100%; height: 100%; user-select: none;'
                        downSpan.appendChild(container.children[0])
                        downSpan.children[0].style.cssText = 'position: absolute; width: 100%; height: 100%; user-select: none;'
                        container.children[0].insertAdjacentElement('beforebegin',downSpan)
                       
                        const overFlowSpan = document.createElement('overFlow')
                        overFlowSpan.style.cssText = 'position: absolute; width: 50%; height: 100%; overflow: hidden'
                        overFlowSpan.appendChild(container.children[1])
                        overFlowSpan.children[0].style.cssText = `position: absolute; width: ${getComputedStyle(container).width}; height: 100%; user-select: none;`
                        container.appendChild(overFlowSpan)
        
                        const caption = document.createElement('Before')
                        if(downSpan.children[0].getAttribute('data-caption') == 'before' || 'after'){
                           
                            caption.textContent = downSpan.children[0].getAttribute('data-caption')
                            caption.className = 'caption'
                            caption.style.position = 'absolute'
                            caption.style.top = '93%'
                            caption.style.left = '50%'
                            caption.style.transform = 'translateX(28%)'
                            downSpan.appendChild(caption)
                        }

                        const caption1 = document.createElement('after')
                        if(overFlowSpan.children[0].getAttribute('data-caption') == 'before' || 'after'){
                            
                            caption1.textContent = overFlowSpan.children[0].getAttribute('data-caption')
                            caption1.className = 'caption'
                            caption1.style.position = 'absolute'
                            caption1.style.top = '93%'
                            caption1.style.left = '100%'
                            caption1.style.transform = 'translateX(-130%)'
                            caption1.style.textAlign = 'center'
                            overFlowSpan.appendChild(caption1)
                        }


                        dividerLine = document.createElement('dividerLine')
                        dividerLine.className = lineClassName
                        dividerLine.style.cssText = 'position: absolute; transform: translateX(-50%); width: 4px; height: 100%; display: flex; justify-content: center; align-items: center; margin: 0px; padding: 0px; cursor: col-resize;'
                        
                        container.appendChild(dividerLine)
                        const dotDivider = document.createElement('dotDivider')
                        dotDivider.className = arrowClassName
                        dotDivider.style.cssText = 'position: absolute; cursor: col-resize;'

                        dividerLine.appendChild(dotDivider)
                        dividerLine.style.left = getComputedStyle(overFlowSpan).width
                        dividerLine.setAttribute('draggable', true)
                        range.oninput = function(){
                            overFlowSpan.style.width = this.value + '%'
                            dividerLine.style.left = getComputedStyle(overFlowSpan).width
                            caption.style.left = dividerLine.style.left
                            caption1.style.left = dividerLine.style.left
                        }

                        if(getComputedStyle(dividerLine).backgroundColor == "rgba(0, 0, 0, 0)"){
                            dividerLine.style.backgroundColor = 'white'
                        }
                        if(getComputedStyle(dotDivider).width == "0px" || getComputedStyle(dotDivider).height == "0px"){
                            dotDivider.style.width = '30px'
                            dotDivider.style.height = '30px'
                            dotDivider.style.backgroundColor = 'white'
                            dotDivider.style.borderRadius = '50%'
                        } 
                        
                        var timer
                        function checkAnimation(){
                            if(animation == true){
                                timer = window.requestAnimationFrame(checkAnimation)
                                function animate(){
                    
                                    if (pos++ >= 50){
                                        dividerLine.style.left = pos + 'px'
                                        caption.style.left = dividerLine.style.left
                                        caption1.style.left = dividerLine.style.left
                                        overFlowSpan.style.width = pos / container.clientWidth * 99.5 + '%'
                                        var getLenght = getComputedStyle(container).width.length
                                        if(pos == getComputedStyle(container).width.slice(0,3) - 50){
                                            pos = `-${getComputedStyle(container).width.slice(0,3) - 50}`                                
                                        }
                                    }
                                    else if(pos+1 >= `-${getComputedStyle(container).width.slice(0,3) - 50}`){
                                        var backwardAmount = `${pos.toString().slice(1,4)}px`
                                        dividerLine.style.left = backwardAmount
                                        caption.style.left = dividerLine.style.left
                                        caption1.style.left = dividerLine.style.left
                                        overFlowSpan.style.width = `${pos.toString().slice(1,4)}` / container.clientWidth * 99.5 + '%'
                                        if(pos == -50){
                                            pos = 50                                  
                                        }
                                    }
                                }
                                animate()
                            }
                        }

                      
                            window.requestAnimationFrame(checkAnimation)
                        
                            var timerOut;
                            var pos = 50
                            
                            
                            container.onmouseover = ()=> {

                                cancelAnimationFrame(timer)
                                clearTimeout(timerOut)
                            }
                            container.onmouseout = ()=> {
                                timerOut = setTimeout(() => {
                                    timer = window.requestAnimationFrame(checkAnimation, 10)
                                }, 2000);
                            }
                            var timeout
                            container.addEventListener('touchstart',  function(e){
                                e.preventDefault()
                                cancelAnimationFrame(timer)
                                clearTimeout(timeout)
                                
                            }, false)
                            
                            container.addEventListener('touchend',  function(e){
                                e.preventDefault()
                                    timeout = setTimeout(() => {
                                    timer = window.requestAnimationFrame(checkAnimation, 10)
                                }, 2000);
                                
                            }, false)
                        
                        
        
                        const img = document.createElement('img')
                        img.src =  "data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAHElEQVQYlWP8////fwYiABMxihhGFVJHIQMDAwBpmgQQ6RbrhgAAAABJRU5ErkJggg=="
                        
                        dividerLine.ondragstart = function(e){
                            e.dataTransfer.setDragImage(img, 0, 0)
                            setTimeout(()=> this.style.display = 'none', 0)
                            
                        }
                        dividerLine.ondrag = function(e){
                            e.preventDefault()
                            e.dataTransfer.setDragImage(img, 0, 0)
        
                            overFlowSpan.style.width = e.layerX / container.clientWidth * 99.5 + '%'
                            dividerLine.style.left = getComputedStyle(overFlowSpan).width
                            caption.style.left = dividerLine.style.left
                            caption1.style.left = dividerLine.style.left

                        }
                        dividerLine.ondragend = function(e){
                            e.preventDefault()
                            if(e.layerX > container.clientWidth ){
                                overFlowSpan.style.width = 99.5 + '%'
                                dividerLine.style.left = getComputedStyle(overFlowSpan).width
                                caption.style.left = dividerLine.style.left
                                caption1.style.left = dividerLine.style.left
                            
                            }
                            else if(e.layerX < 0){
                                overFlowSpan.style.width = 0 + '%'
                                dividerLine.style.left = getComputedStyle(overFlowSpan).width
                                caption.style.left = dividerLine.style.left
                                caption1.style.left = dividerLine.style.left
                            
                            }
                            else{
                                overFlowSpan.style.width = e.layerX / container.clientWidth * 99.5 + '%'
                                dividerLine.style.left = getComputedStyle(overFlowSpan).width
                                caption.style.left = dividerLine.style.left
                                caption1.style.left = dividerLine.style.left
                    
                            }
                            this.style.display = 'flex'
                        }
                        dividerLine.addEventListener('touchstart',  function(e){
                            setTimeout(()=> dividerLine.style.display = 'none', 0)
                            setTimeout(()=> dividerLine.style.display = 'flex', 0)
                            cancelAnimationFrame(timer)
                            
                        })
                        dividerLine.addEventListener('touchmove', (e)=> {
                            clearTimeout(timeout)
                            e.preventDefault()
                            overFlowSpan.style.width = e.targetTouches.item(0).clientX / container.clientWidth * 99.5 + '%'
                            dividerLine.style.left = getComputedStyle(overFlowSpan).width
                            if(e.changedTouches.item(0).clientX > container.clientWidth ){
                                overFlowSpan.style.width = 99.5 + '%'
                                dividerLine.style.left = getComputedStyle(overFlowSpan).width
                                caption.style.left = dividerLine.style.left
                                caption1.style.left = dividerLine.style.left
                            
                            }
                            else if(e.changedTouches.item(0).clientX < 0){
                                overFlowSpan.style.width = 0 + '%'
                                dividerLine.style.left = getComputedStyle(overFlowSpan).width
                                caption.style.left = dividerLine.style.left
                                caption1.style.left = dividerLine.style.left
                            
                            }
                            else{
                                overFlowSpan.style.width = e.changedTouches.item(0).clientX / container.clientWidth * 99.5 + '%'
                                dividerLine.style.left = getComputedStyle(overFlowSpan).width
                                caption.style.left = dividerLine.style.left
                                caption1.style.left = dividerLine.style.left
                    
                            }
                            dividerLine.style.display = 'flex'

                        })
                        dividerLine.addEventListener('touchend', function(e){
                            e.preventDefault()
                            if(e.changedTouches.item(0).clientX > container.clientWidth ){
                                overFlowSpan.style.width = 99.5 + '%'
                                dividerLine.style.left = getComputedStyle(overFlowSpan).width
                                caption.style.left = dividerLine.style.left
                                caption1.style.left = dividerLine.style.left
                            
                            }
                            else if(e.changedTouches.item(0).clientX < 0){
                                overFlowSpan.style.width = 0 + '%'
                                dividerLine.style.left = getComputedStyle(overFlowSpan).width
                                caption.style.left = dividerLine.style.left
                                caption1.style.left = dividerLine.style.left
                            
                            }
                            else{
                                overFlowSpan.style.width = e.changedTouches.item(0).clientX / container.clientWidth * 99.5 + '%'
                                dividerLine.style.left = getComputedStyle(overFlowSpan).width
                                caption.style.left = dividerLine.style.left
                                caption1.style.left = dividerLine.style.left
                    
                            }
                            dividerLine.style.display = 'flex'
                        } ) 
        
                    }
                }
            }
            if(direction.toLowerCase() === "vertical"){
                if(container.children.length == 2){
                    
                    if(container.children[0].tagName === 'IMG' && container.children[1].tagName === 'IMG'){

                        const downSpan = document.createElement('downSpan')
                        downSpan.style.cssText = ' position: absolute; width: 100%; height: 100%; user-select: none;'
                        downSpan.appendChild(container.children[0])
                        downSpan.children[0].style.cssText = ' position: absolute; width: 100%; height: 100%; user-select: none;'
                        container.children[0].insertAdjacentElement('beforebegin',downSpan)

                        const overFlowSpan = document.createElement('overFlow')
                        overFlowSpan.style.cssText = ' position: absolute; width: 100%; height: 50%; overflow: hidden'
                        overFlowSpan.appendChild(container.children[1])
                        overFlowSpan.children[0].style.cssText = `position: absolute; width: 100%; height: ${getComputedStyle(container).height}; user-select: none;`
                        container.appendChild(overFlowSpan)

                        const caption = document.createElement('Before')
                        if(downSpan.children[0].getAttribute('data-caption') == 'before' || 'after'){
                           
                            caption.textContent = downSpan.children[0].getAttribute('data-caption')
                            caption.className = 'caption'
                            caption.style.position = 'absolute'
                            caption.style.top = '50%'
                            caption.style.left = '5%'
                            caption.style.textAlign = 'center'
                            caption.style.transform = 'translateY(45%)'
                            downSpan.appendChild(caption)
                        }

                        const caption1 = document.createElement('after')
                        if(overFlowSpan.children[0].getAttribute('data-caption') == 'before' || 'after'){
                            
                            caption1.textContent = overFlowSpan.children[0].getAttribute('data-caption')
                            caption1.className = 'caption'
                            caption1.style.position = 'absolute'
                            caption1.style.top = '100%'
                            caption1.style.left = '5%'
                            caption1.style.transform = 'translateY(-145%)'
                            caption1.style.textAlign = 'center'
                            overFlowSpan.appendChild(caption1)
                        }

                        dividerLine = document.createElement('dividerLine')
                        dividerLine.className = lineClassName
                        dividerLine.style.cssText = 'position: absolute; transform: translateY(-50%); width: 100%; height: 4px; display: flex; justify-content: center; align-items: center; margin: 0px; padding: 0px; cursor: row-resize;'
                        
                        container.appendChild(dividerLine)
                        const dotDivider = document.createElement('dotDivider')
                        dotDivider.className = arrowClassName
                        dotDivider.style.cssText = 'position: absolute; cursor: row-resize;'

                        dividerLine.appendChild(dotDivider)
                        dividerLine.style.top = getComputedStyle(overFlowSpan).height
                        dividerLine.setAttribute('draggable', true)
                        range.oninput = function(){
                            overFlowSpan.style.height = this.value + '%'
                            dividerLine.style.top = getComputedStyle(overFlowSpan).height
                            caption.style.top = dividerLine.style.top
                            caption1.style.top = dividerLine.style.top
                        }

                        if(getComputedStyle(dividerLine).backgroundColor == "rgba(0, 0, 0, 0)"){
                            console.log('yes')
                            dividerLine.style.backgroundColor = 'white'
                        }  
                        if(getComputedStyle(dotDivider).width == "0px" || getComputedStyle(dotDivider).height == "0px"){
                            console.log('yes')
                            dotDivider.style.width = '30px'
                            dotDivider.style.height = '30px'
                            dotDivider.style.backgroundColor = 'white'
                            dotDivider.style.borderRadius = '50%'
                        } 
        

                        var timer
                            function checkAnimation(){
                                if(animation == true){
                                    timer = window.requestAnimationFrame(checkAnimation)
                                    function animate(){
                        
                                        if (pos++ >= 50){
                                            dividerLine.style.top = pos + 'px'
                                            caption.style.top = dividerLine.style.top
                                            caption1.style.top = dividerLine.style.top
                                            overFlowSpan.style.height = pos / container.clientHeight * 99.5 + '%'
                                            var getLenght = getComputedStyle(container).height.length
                                            if(pos == getComputedStyle(container).height.slice(0,3) - 50){
                                                pos = `-${getComputedStyle(container).height.slice(0,3) - 50}`                                
                                            }
                                        }
                                        else if(pos+1 >= `-${getComputedStyle(container).height.slice(0,3) - 50}`){
                                            var backwardAmount = `${pos.toString().slice(1,4)}px`
                                            dividerLine.style.top = backwardAmount
                                            caption.style.top = dividerLine.style.top
                                            caption1.style.top = dividerLine.style.top
                                            overFlowSpan.style.height = `${pos.toString().slice(1,4)}` / container.clientHeight * 99.5 + '%'
                                            if(pos == -50){
                                                pos = 50                                  
                                            }
                                        }

                                    }
                                    animate()
                                }
                            }

                            timer = window.requestAnimationFrame(checkAnimation)

                            if(animation != true){
                                cancelAnimationFrame(timer)
                            }
                            var timerOut;
                            var pos = 50
                            
                            
                            container.onmouseover = ()=> {
                                cancelAnimationFrame(timer)
                                clearTimeout(timerOut)
                            }
                            container.onmouseout = ()=> {
                                timerOut = setTimeout(() => {
                                    timer = window.requestAnimationFrame(checkAnimation, 10)
                                }, 2000);
                            }
                            var timeout
                            container.addEventListener('touchstart',  function(e){
                                e.preventDefault()
                                cancelAnimationFrame(timer)
                                clearTimeout(timeout)
                                
                            }, false)
                            
                            container.addEventListener('touchend',  function(e){
                                e.preventDefault()
                                    timeout = setTimeout(() => {
                                    timer = window.requestAnimationFrame(checkAnimation, 10)
                                }, 2000);
                                
                            }, false)
                        
              

                        const img = document.createElement('img')
                        img.src =  "data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAHElEQVQYlWP8////fwYiABMxihhGFVJHIQMDAwBpmgQQ6RbrhgAAAABJRU5ErkJggg=="
                        
                        dividerLine.ondragstart = function(e){
                            e.dataTransfer.setDragImage(img, 0, 0)
                            setTimeout(()=> this.style.display = 'none', 0)
                            
                        }
                        dividerLine.ondrag = function(e){
                            e.preventDefault()
                            e.dataTransfer.setDragImage(img, 0, 0)
        
                            overFlowSpan.style.height = e.layerY / container.clientHeight * 100 + '%'
                            dividerLine.style.top = getComputedStyle(overFlowSpan).height
                            caption.style.top = dividerLine.style.top
                            caption1.style.top = dividerLine.style.top
                                
                        }
                        dividerLine.ondragend = function(e){
                            e.preventDefault()
                            if(e.layerY > container.clientHeight ){
                                overFlowSpan.style.height = 99.5 + '%'
                                dividerLine.style.top = getComputedStyle(overFlowSpan).height
                                caption.style.top = dividerLine.style.top
                                caption1.style.top = dividerLine.style.top
                            
                            }
                            else if(e.layerY < 0){
                                overFlowSpan.style.height = 0 + '%'
                                dividerLine.style.top = getComputedStyle(overFlowSpan).height
                                caption.style.top = dividerLine.style.top
                                caption1.style.top = dividerLine.style.top
                            
                            }
                            else{
                                overFlowSpan.style.height = e.layerY / container.clientHeight * 100 + '%'
                                dividerLine.style.top = getComputedStyle(overFlowSpan).height
                                caption.style.top = dividerLine.style.top
                                caption1.style.top = dividerLine.style.top
                    
                            }
                            this.style.display = 'flex'
                        }
                        dividerLine.addEventListener('touchstart',  function(e){
                            setTimeout(()=> dividerLine.style.display = 'none', 0)
                            setTimeout(()=> dividerLine.style.display = 'flex', 0)
                            cancelAnimationFrame(timer)
               
                        })
                        dividerLine.addEventListener('touchmove', (e)=> {
                            clearTimeout(timeout)
                            e.preventDefault()
                            overFlowSpan.style.height = e.targetTouches.item(0).clientY / container.clientHeight * 99.5 + '%'
                            dividerLine.style.top = getComputedStyle(overFlowSpan).height
                            if(e.changedTouches.item(0).clientY > container.clientHeight ){
                                overFlowSpan.style.height = 99.5 + '%'
                                dividerLine.style.top = getComputedStyle(overFlowSpan).height
                                caption.style.top = dividerLine.style.top
                                caption1.style.top = dividerLine.style.top
                            
                            }
                            else if(e.changedTouches.item(0).clientY < 0){
                                overFlowSpan.style.height = 0 + '%'
                                dividerLine.style.top = getComputedStyle(overFlowSpan).height
                                caption.style.top = dividerLine.style.top
                                caption1.style.top = dividerLine.style.top
                            
                            }
                            else{
                                overFlowSpan.style.height = e.changedTouches.item(0).clientY / container.clientHeight * 100 + '%'
                                dividerLine.style.top = getComputedStyle(overFlowSpan).height
                                caption.style.top = dividerLine.style.top
                                caption1.style.top = dividerLine.style.top
                    
                            }
                            dividerLine.style.display = 'flex'
                        })
                        dividerLine.addEventListener('touchend', function(e){
                            e.preventDefault()
                            if(e.changedTouches.item(0).clientY > container.clientHeight ){
                                overFlowSpan.style.height = 99.5 + '%'
                                dividerLine.style.top = getComputedStyle(overFlowSpan).height
                                caption.style.top = dividerLine.style.top
                                caption1.style.top = dividerLine.style.top
                            
                            }
                            else if(e.changedTouches.item(0).clientY < 0){
                                overFlowSpan.style.height = 0 + '%'
                                dividerLine.style.top = getComputedStyle(overFlowSpan).height
                                caption.style.top = dividerLine.style.top
                                caption1.style.top = dividerLine.style.top
                            
                            }
                            else{
                                overFlowSpan.style.height = e.changedTouches.item(0).clientY / container.clientHeight * 100 + '%'
                                dividerLine.style.top = getComputedStyle(overFlowSpan).height
                                caption.style.top = dividerLine.style.top
                                caption1.style.top = dividerLine.style.top
                    
                            }
                            dividerLine.style.display = 'flex'
                        } ) 
        
                    }
                }
            }
        }
    }

}

export {iMatch}