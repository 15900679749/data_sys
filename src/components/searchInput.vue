<template>
			<el-autocomplete v-model="state4" :fetch-suggestions="querySearchAsync" placeholder="请输入问卷名进行搜查..." @select="handleSelect">
		
	<i class="el-input__icon el-icon-search" slot="suffix" @click="handleIconClick"></i>
	<!--<el-button slot="append" icon="el-icon-search"></el-button>-->
	</el-autocomplete>
	</el-col>

</template>

<script>
	export default{
		data(){
			return{
				restaurants:[],
				state4:'',
				timeout:null
			};
		},
		methods:{
			loadAll(){
				return[
					{"value":"问卷调查1","type":"心理测试"},
					{"value":"问卷调查2","type":"兴趣测试"}
				];
			},
			querySearchAsync(queryString,cb){
				var restaurants=this.restaurants;
				var results=queryString?restaurants.filter(this.createStateFilter(queryString)):restaurants;
				
				clearTimeout(this.timeout);
				this.timeout=setTimeout(()=>{
					cb(results);
				},3000*Math.random());
			},
			createStateFilter(queryString){
				return (state)=>{
					return (state.value.toLowerCase().indexOf(queryString.toLowerCase())===0);
				};
			},
			handleSelect(item){
				console.log(item);
			},
			 handleIconClick(ev) {
		        console.log(this.state4);
		      }
		},
		mounted(){
			this.restaurants=this.loadAll();
		}
	}
</script>

<style>
	.el-autocomplete{
		width: 50%;
	}
	.el-autocomplete .el-input__inner{
		width: 100%;
		border-radius: 14px;
	}
</style>