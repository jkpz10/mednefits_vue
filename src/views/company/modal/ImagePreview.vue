<template>
  <transition name="imgPreview" appear>
    <div class="preview-box">
      <div class="img-container">
        <slot name="content">
          <h1>Image Here</h1>
          <!-- <a @click="showPreview = false" class="hidePreview">
            <i class="fa fa-times"></i>
          </a>
          <img :src="'../assets/img/home-bg.jpg'"> -->
        </slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      sampleData: false
    };
  }
};
</script>

<style lang="scss">

.preview-box {
	position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0,0.50);
  z-index: 999;
  overflow-y: auto;

  .img-container {
  	width: 500px;
  	margin: 80px auto;
  	text-align: center;
  	position: relative;

  	a {
  		position: absolute;
  		right: -5px;
    	top: -25px;
  	}

  	img {
  		width: 500px;
  		height: auto;
  	}
  }

  i {
  	font-size: 16px;
  	color: #eee;
    background: #000;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    padding: 2px 0px;
  }
}

.imgPreview-enter-active,
.imgPreview-leave-active {
  /* transition: opacity; */
  -webkit-transition: all .2s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  -moz-transition: all .2s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  -o-transition: all .2s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  transition: all .2s cubic-bezier(0.785, 0.135, 0.15, 0.86); /* easeInOutCirc */

  -webkit-transition-timing-function: cubic-bezier(0.785, 0.135, 0.15, 0.86);
  -moz-transition-timing-function: cubic-bezier(0.785, 0.135, 0.15, 0.86);
  -o-transition-timing-function: cubic-bezier(0.785, 0.135, 0.15, 0.86);
  transition-timing-function: cubic-bezier(
    0.785,
    0.135,
    0.15,
    0.86
  ); /* easeInOutCirc */
}
.imgPreview-enter,
.imgPreview-leave-to {
  opacity: 0;
}
</style>