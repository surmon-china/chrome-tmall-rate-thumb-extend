/**
 * @author: Surmon.me
 */
$(() => {
	
	// console.log('dom加载完')

	// 构造按钮和事件
	const buildActionButtonAndEvents = thumbElement => {

		// 如果地址无效则是未展开，图片有可能是没展开的
		const thumbSrc = thumbElement.getElementsByTagName('img')[0].getAttribute('src')

		// 如果图片未展开，则什么都不做
		if (!thumbSrc) return false

		// 查看原图
		const originalImgBtn = document.createElement('a')
		originalImgBtn.className = 'original-thumb'
		originalImgBtn.innerHTML = '查看原图'
		originalImgBtn.target = '_blank'
		originalImgBtn.href = thumbSrc.replace('_400x400.jpg', '')
		originalImgBtn.onclick = () => {
			const thumbSrc = thumbElement.getElementsByTagName('img')[0].getAttribute('src')
			originalImgBtn.href = thumbSrc.replace('_400x400.jpg', '')
			// window.open(thumbSrc.replace('_400x400.jpg', '')); 
			// return false
		}

		// 向左转
		const rotateL = document.createElement('a')
		rotateL.className = 'rotate-left'
		rotateL.innerHTML = '向左转'
		rotateL.href = ''
		rotateL.onclick = () => {
			const thumb = thumbElement.getElementsByTagName('img')[0]
			const oldRotateDeg = thumb.style.transform.replace(/[^-|0-9]/ig, '')
			const rotateDeg = oldRotateDeg ? 'rotate(' + (Number(oldRotateDeg) - 90) + 'deg)' : 'rotate(-90deg)' 
			thumb.style.transform = rotateDeg
			return false
		}

		// 向右转
		const rotateR = document.createElement('a')
		rotateR.className = 'rotate-right'
		rotateR.innerHTML = '向右转'
		rotateR.href = ''
		rotateR.onclick = () => {
			const thumb = thumbElement.getElementsByTagName('img')[0]
			const oldRotateDeg = thumb.style.transform.replace(/[^-|0-9]/ig, '')
			const rotateDeg = oldRotateDeg ? 'rotate(' + (Number(oldRotateDeg) + 90) + 'deg)' : 'rotate(90deg)' 
			thumb.style.transform = rotateDeg
			return false
		}

		// 构造父框
		const actionWrap = document.createElement('div')
		actionWrap.className = 'rata-thumb-actions'
		actionWrap.append(originalImgBtn)
		actionWrap.append(rotateL)
		actionWrap.append(rotateR)

		thumbElement.append(actionWrap)
	}

	// 给图片父容器dom-push内建元素
	const doPushActionButtons = rateThunmList => {
		Array.prototype.map.call(rateThunmList, thumb => {
			// console.log('添加内容了', thumb.children.length, thumb.children[0].tagName.toUpperCase)
			if (thumb.children.length <= 3 && thumb.children[0].tagName.toUpperCase() === 'IMG') {
				buildActionButtonAndEvents(thumb)
			}
		})
	}

	// 判断对应的dom是否存在
	const validateRateList = () => {
		const rateThunmList = document.getElementsByClassName('tm-m-photo-viewer')
		if (rateThunmList.length) {
			doPushActionButtons(rateThunmList)
		}
	}

	// 初始化
	const init = () => {
		MutationObserver = window.MutationObserver || window.WebKitMutationObserver
		const observer = new MutationObserver((mutations, observer) => {
	    // console.log(mutations, observer)
	    validateRateList()
		})
		observer.observe(document.getElementById('J_Reviews'), {
		  subtree: true,
		  attributes: true
		})
	}

	init()
})