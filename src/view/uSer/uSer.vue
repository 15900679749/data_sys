<template>
	<div class="Templatecontain">
		<el-form ref="form" :model="form" label-width="80px" class="usersearch">
			<el-row>
				<el-form-item label="ID">
					<el-input v-model="form.uid"></el-input>
				</el-form-item>
				<el-form-item label="用户名">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="微信号">
					<el-input v-model="form.wx_name"></el-input>
				</el-form-item>
			</el-row>
			<el-row>
				<el-col :span="16">

					<el-form-item label="手机号">
						<el-input v-model="form.mobile"></el-input>
					</el-form-item>
					<el-form-item label="权限">
						<el-select v-model="form.level" placeholder="请选择用户权限">
							<el-option label="一级用户" value="oneadmain"></el-option>
							<el-option label="二级用户" value="twoadmain"></el-option>
							<el-option label="三级用户" value="threeadmain"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-button>查询</el-button>
					<el-button @click="adduser">新增</el-button>
					<el-button @click="">删除</el-button>
				</el-col>
			</el-row>
		</el-form>

		<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" @selection-change="handleSelectionChange" border :header-cell-style="{background:'#f7f7f7',color:'#1f1f1f'}" style="width:100%">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="id" label="ID" width="100" align="center"></el-table-column>
			<el-table-column prop="name" label="用户名" width="100" align="center"></el-table-column>
			<el-table-column prop="wxid" label="微信号" width="100" align="center"></el-table-column>
			<el-table-column prop="photo" label="微信头像" width="150" align="center"></el-table-column>
			<el-table-column prop="wxname" label="微信昵称" width="150" align="center"></el-table-column>
			<el-table-column prop="tel" label="手机号" width="150" align="center"></el-table-column>
			<el-table-column prop="address" label="地址" width="250" align="center"></el-table-column>
			<el-table-column prop="admin" label="权限" width="110" align="center"></el-table-column>
			<el-table-column prop="time" label="创建时间" width="150" align="center"></el-table-column>
			<el-table-column prop="action" label="操作" width="200" align="center">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>

		</el-table>

		<div class="block">
			<span class="demonstration"></span>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
			</el-pagination>
		</div>

		<div class="zhezhao" v-show="addshow">
			<div class="addedit">
				<h6>用户：新增/编辑</h6>
				<el-form ref="addform" :model="addform" label-width="80px" class="useradd" :rules="rules">
					<el-form-item label="权限" prop="region">
						<i class="itemmust">*</i>
						<el-select v-model="addform.region" placeholder="请选择用户权限">
							<el-option label="一级用户" value="oneadmain"></el-option>
							<el-option label="二级用户" value="twoadmain"></el-option>
							<el-option label="三级用户" value="threeadmain"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="用户名" prop="name">
						<i class="itemmust">*</i>
						<el-input v-model="addform.name"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<i class="itemmust">*</i>
						<el-input v-model="addform.password"></el-input>
					</el-form-item>
					<el-form-item label="手机号" prop="tel">
						<i class="itemmust">*</i>
						<el-input v-model="addform.tel"></el-input>
					</el-form-item>
					<el-form-item label="微信号" prop="wxid">
						<i class="itemmust">*</i>
						<el-input v-model="addform.wxid"></el-input>
					</el-form-item>
					<el-form-item label="地址" prop="address">

						<el-input v-model="addform.address"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button @click="cancleadd">取消</el-button>
						<el-button type="primary" @click="submitForm('addform')">确定</el-button>

					</el-form-item>
				</el-form>

			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				multipleSelection: [],
				addshow: false,
				currentRow: null,
				currentPage1: 5,
				currentPage2: 5,
				currentPage3: 5,
				currentPage4: 4,
				form: {
					token: '',
					name: '',
					uid: '',
					wx_name: '',
					mobile: '',
					level: '',
					p: ''
				},
				addform: {
					id: '',
					photo: "",
					name: '',
					wxid: '',
					wxname: '',
					tel: '',
					sex: '',
					address: '',
					admin: '',
					time: '',
					action: ''
				},
				naddform: {
					id: '',
					photo: "",
					name: '',
					wxid: '',
					wxname: '',
					tel: '',
					sex: '',
					address: '',
					admin: '',
					time: '',
					action: ''
				},
				rules: {
					name: [{
							required: true,
							message: '请输入活动名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					//        region: [
					//          { required: true, message: '请选择活动区域', trigger: 'change' }
					//        ],
					//        date1: [
					//          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
					//        ],
					//        date2: [
					//          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
					//        ],
					//        type: [
					//          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
					//        ],
					//        resource: [
					//          { required: true, message: '请选择活动资源', trigger: 'change' }
					//        ],
					//        desc: [
					//          { required: true, message: '请填写活动形式', trigger: 'blur' }
					//        ]
				},
				tableData: [{
						id: '1',
						photo: "路边的仙人掌",
						wxid: '1',
						wxname: '赵赵',
						tel: '18900597456',
						sex: '男',
						address: '上海市虹口区虹口龙之梦38A',
						admin: '',
						time: '',
						action: ''
					},
					{
						id: '2',
						photo: "路边的仙人掌",
						wxid: '1',
						wxname: '赵赵',
						tel: '18900597456',
						sex: '男',
						address: '上海市虹口区虹口龙之梦38A',
						admin: '',
						time: '',
						action: ''

					}
				]
			}
		},
		methods: {
			adduser() {
				this.addshow = true;
			},
			cancleadd() {
				this.addshow = false;
			},
			submitForm(addform) {
				this.$post('/Home/User/userList', this.addform).then((res) => {
					console.log(res);

				}).catch((err) => {

				})
				this.$refs.addform.validate((valid) => {
					//this.$refs.addform.resetFields();
					if(valid) {
						this.addshow = false;
						//JSON.stringfy(this.addform));
						this.tableData.push(JSON.parse(JSON.stringify(this.addform)));
						this.addform = JSON.parse(JSON.stringify(this.naddform));
					} else {
						console.log('error submit!');
						return false;
					}
				})
			},
			toggleSelection(rows) {
				if(rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(val);
			},
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			formrequest(){
				
			}
		},
		mounted() {

		},
		created(){
			this.formrequest();
		}
	}
</script>

<style>
	.Templatecontain .el-table__header,
	.Templatecontain .el-table__body {
		width: auto !important;
	}
	
	.usersearch .el-input {
		width: 200px;
	}
	
	.usersearch .el-input .el-input__inner {
		width: 200px;
	}
	
	.usersearch .el-form-item {
		width: 300px;
		display: inline-block;
	}
</style>
<style scoped="scoped" lang="scss">
	.block {
		width: 100%;
		text-align: center;
		margin-top: 50px;
	}
	
	.Templatecontain {
		width: 100%;
		height: 100%;
		padding: 60px 10% 0px 10%;
		box-sizing: border-box;
	}
	
	.usersearch .el-row {
		margin-bottom: 10px;
	}
	
	.zhezhao {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .5);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
	}
	
	.addedit {
		background: #fff;
		width: 30%;
		padding: 10px 5% 20px;
		top: 50%;
		left: 50%;
		position: absolute;
		transform: translate(-50%, -50%);
		.el-form-item {
			margin-bottom: 15px;
		}
		h6 {
			text-align: center;
			margin: 10px auto 20px;
		}
		.el-col {
			text-align: center;
		}
	}
	
	.itemmust {
		left: -71px;
	}
</style>