<template>
	<div class="Templatecontain">
		<el-form label-width="80px" class="usersearch">
			<el-row>
				<el-form-item label="ID">
					<el-input v-model="searchInfo.uid"></el-input>
				</el-form-item>
				<el-form-item label="用户名">
					<el-input v-model="searchInfo.name"></el-input>
				</el-form-item>
				<el-form-item label="微信号">
					<el-input v-model="searchInfo.wx_name"></el-input>
				</el-form-item>
			</el-row>
			<el-row>
				<el-col :span="16">

					<el-form-item label="手机号">
						<el-input v-model="searchInfo.mobile"></el-input>
					</el-form-item>
					<el-form-item label="权限">
						<el-select v-model="searchInfo.level" placeholder="请选择用户权限">
							<el-option label="一级用户" value="oneadmain"></el-option>
							<el-option label="二级用户" value="twoadmain"></el-option>
							<el-option label="三级用户" value="threeadmain"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-button @click="searchBtn">查询</el-button>
					<el-button @click="adduser">新增</el-button>
					<el-button @click="handleDelete" data-type="deletlist">删除</el-button>
				</el-col>
			</el-row>
		</el-form>

		<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" @selection-change="handleSelectionChange" border :header-cell-style="{background:'#f7f7f7',color:'#1f1f1f'}" style="width:100%">
			<el-table-column type="selection" width="35">
			</el-table-column>
			<el-table-column prop="uid" label="ID" width="90" align="center"></el-table-column>
			<el-table-column prop="name" label="用户名" width="100" align="center"></el-table-column>
			<el-table-column prop="wx_name" label="微信号" width="100" align="center"></el-table-column>
			<el-table-column prop="wx_url" label="微信头像" width="80" align="center"></el-table-column>
			<el-table-column prop="wx_nickname" label="微信昵称" width="83" align="center"></el-table-column>
			<el-table-column prop="mobile" label="手机号" width="110" align="center"></el-table-column>
			<el-table-column prop="addr" label="地址" width="150" align="center"></el-table-column>
			<el-table-column prop="level" label="权限" width="80" align="center"></el-table-column>
			<el-table-column prop="create_at" label="创建时间" width="100" align="center"></el-table-column>
			<el-table-column prop="action" label="操作" width="150" align="center">
				<template slot-scope="scope">
					<!--<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
					<el-button size="mini" @click="editUser(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" data-type="deletone">删除</el-button>
				</template>
			</el-table-column>

		</el-table>

		<div class="block">
			<span class="demonstration"></span>
			<!--<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage1" :page-sizes="pageSizes" :page-size="searchInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="searchInfo.pageTotal">
			</el-pagination>-->
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage1" :page-sizes="pageSizes" :page-size="searchInfo.pageSize" layout="total, prev, pager, next, jumper" :total="searchInfo.pageTotal">
			</el-pagination>
		</div>

		<div class="zhezhao" v-show="addshow">
			<div class="addedit">
				<h6>用户：新增/编辑</h6>
				<el-form ref="addform" :model="addform" label-width="80px" class="useradd" :rules="rules">
					<el-form-item label="权限" prop="level">

						<el-select v-model="addform.level" placeholder="请选择用户权限">
							<el-option label="一级用户" value="1"></el-option>
							<el-option label="二级用户" value="2"></el-option>
							<el-option label="三级用户" value="3"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="用户名" prop="name">

						<el-input v-model="addform.name"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">

						<el-input v-model="addform.password" type="password"></el-input>
					</el-form-item>
					<el-form-item label="手机号" prop="mobile">

						<el-input v-model="addform.mobile"></el-input>
					</el-form-item>
					<el-form-item label="微信号" prop="wx_name">

						<el-input v-model="addform.wx_name"></el-input>
					</el-form-item>
					<el-form-item label="地址" prop="addr">
						<el-input v-model="addform.addr"></el-input>
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
	import storage from 'javascripts/utils/storage';
	export default {
		data() {
			return {
				userlevel: 0,
				multipleSelection: [],
				pageSizes: [10, 20, 50, 100],
				deleteList: [],
				idList: [],
				tag: '',
				searchInfo: {
					uid: "",
					name: "",
					wx_name: "",
					mobile: "",
					level: "",
					pageIndex: 1,
					pageSize: 10,
					pageTotal: 0
				},
				addshow: false,
				currentPage1: 1,
				form: {
					id: '',
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: '',
				},
				addform: {
					id: "",
					name: "",
					password: '',
					wx_name: '',
					mobile: '',
					level: '',
					addr: ''
				},
				rules: {
					name: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						//					{min: 3,max: 5,message: '长度在 3 到 5 个字符',trigger: 'blur'}
					],
					password: [{
						required: true,
						message: '最少输入六位数密码',
						trigger: 'blur'
					}],
					mobile: [{
						required: true,
						message: '请输入手机号',
						trigger: 'blur'
					}],
					wx_name: [{
						required: true,
						message: '请输入微信号',
						trigger: 'blur'
					}],
					addr: [{
						required: false,
						message: '请输入地址',
						trigger: 'blur'
					}],
					level: [{
						required: true,
						message: '请选择用户权限',
						trigger: 'change'
					}],
					//        desc: [
					//          { required: true, message: '请填写活动形式', trigger: 'blur' }
					//        ]
				},
				tableData: []
			}
		},
		methods: {
			adduser() {
				if(this.userlevel > 1) {
					this.$message({
						type: 'error',
						message: '对不起，您没有此权限'
					});
					return
				}
				this.tag = 'add';
				this.$refs.addform.resetFields();

				this.addshow = true;

			},
			cancleadd() {
				this.addshow = false;
			},
			submitForm(addform) {

				this.$refs.addform.validate((valid) => {
					//this.$refs.addform.resetFields();
					if(valid) {
						this.addshow = false;
						//JSON.stringfy(this.addform));
						//						this.tableData.push(JSON.parse(JSON.stringify(this.addform)));
						//						this.addform = JSON.parse(JSON.stringify(this.naddform));
						let oData = this.addform;
						let smessage = '';
						let subUrl = '';
						if(this.tag == "add") {

							smessage = "新增成功!";
							subUrl = "/Home/User/createUser";
						} else {
							subUrl = "/Home/User/editUser";
							smessage = "修改成功!";
						}

						//						if(oData.id == "") {
						//							delete oData.id;
						//						} else {
						//							subUrl = "/Home/User/editUser";
						//							smessage = "修改成功!";
						//						}
						this.$post(subUrl, oData).then((res) => {
							this.$message({
								type: 'success',
								message: smessage
							});
							this.getList();
						});

					} else {
						return false;
					}
				})
			},
			editUser(rindex, rdata) {
				if(this.userlevel > 1) {
					this.$message({
						type: 'error',
						message: '对不起，您没有此权限'
					});
					return
				}
				this.tag = 'edit';
				//根据Id等到 对象，赋值给修改的对象
				//				this.$post("/Home/User/getUser", {
				//					id: rdata.id
				//				}).then((res) => {
				this.addshow = true;

				for(let k in this.addform) {

					this.addform[k] = rdata[k];

				}

				//				});

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

				if(val.length) {
					this.deleteList.push(val[val.length - 1])
				};
				return this.deleteList;
			},
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
					if(this.userlevel > 1) {
					this.$message({
						type: 'error',
						message: '对不起，您没有此权限'
					});
					return
				}
				for(let i in this.deleteList) {

					this.idList[i] = this.deleteList[i].id;

				}
				console.log(this.idList);
				let idtem = '';
				var eventbtn = event.target.parentElement.dataset.type;
				if(eventbtn == "deletlist") {
					idtem = this.idList;
				} else if(eventbtn == "deletone") {
					idtem = row.id;
				}
				this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {

					this.$post("/Home/User/delUser", {
						id: idtem
					}).then((res) => {
						this.getList();
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.deleteList = [];
					});
					//					this.tableData.splice(index, 1);

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				})
			},
			handleSizeChange(val) {
				this.searchInfo.pageSize = val;
				this.getList();
			},
			searchBtn() {
				this.getList();
			},
			handleCurrentChange(val) {
				this.searchInfo.pageIndex = val;
				this.getList();
			},
			getList() {
				let sendModel = this.searchInfo;
				delete sendModel.pageTotal;
				this.$post("/Home/User/userList", sendModel).then((res) => {
					let resdata = res;
					this.tableData = resdata.list;
					this.searchInfo.pageTotal = Number(resdata.page.pageTotal);
				});
			},

		},
		mounted() {

		},
		created() {
			this.getList();
			this.userlevel = Number(JSON.parse(storage.get('user')).level)
		}
	}
</script>

<style>
	body .el-table th.gutter {
		display: table-cell!important;
	}
	/*.Templatecontain .el-table__header,
	.Templatecontain .el-table__body {
		width: auto !important;
	}*/
	
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
	
	.useradd .el-form-item__content {
		margin-bottom: 5px;
	}
</style>
<style scoped="scoped" lang="scss">
	.zhezhao .el-button {
		&:nth-of-type(1) {
			margin-right: 40%;
		}
	}
	
	.zhezhao .el-input__inner {
		height: 36px;
		line-height: 36px;
	}
	
	.block {
		width: 100%;
		text-align: center;
		margin-top: 50px;
		padding-bottom: 20px;
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