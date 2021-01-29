<template>
	<view>
	<li @longtap="longtap()">长按触发事件</li>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			  longtap(){
			      uni.showModal({
			      	title: '提示',
			      	content: '确定打开当前区域房间门吗？',
			      	success: function(res) {
			      		if (res.confirm) {
			      			
			      		} else if (res.cancel) {
			      			
			      		}
			      	}
			      });
			     }
		}
	}
</script>

<style>
</style>