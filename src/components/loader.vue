<template>
  <div>
    <div class="loader"></div>
  </div>
</template>
<style>
.loader {
  width: 30px;
  height: 30px;
  animation: loading 1s infinite ease-out;
  margin: auto;
  border-radius: 50%;
  background-color: #8bc34a;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 41%;
  transform: translate(-50%, -50%);
}
@keyframes loading {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(8);
    opacity: 0;
  }
}
</style>
