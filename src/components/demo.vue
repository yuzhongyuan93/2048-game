<template>
    <div>
        <div style = "margin: 40px; width: 100%; vertical-align: middle;">
            <div style = "width: 50%; display: inline-block">
                <label style = "font-size: 0.5em">所属二级站点：</label>
                <div style = "display: inline-block">
                    <Select v-model = "filterSite" clearable filterable style="width: 70%" @on-change = "searchByUser">
                        <Option v-for = "item in optionSites" :value = "item.name" :key = "item.name">{{ item.name }}</Option>
                    </Select>
                </div>

                <!--searchByUser() {
                    this.getDataConfig = {...this.getDataConfig}
                    this.getDataConfig.getFunc = api[TYPES.USER.GETUSER]
                    this.getDataConfig.params.name = this.filterSite
                    console.log(this.getDataConfig.params.name)
                    this.selectedUser = ''
                },-->


            </div>
            <div style="margin-left: 20%; display: inline-block; vertical-align: middle;">
                <i-input v-model = "selectedUser" placeholder = "输入用户名搜索" @on-enter = "searchByName">
                    <Button slot = "append" icon = "ios-search" @click = "searchByName" ></Button>
                </i-input>
            </div>
        </div>
        <ivu-table :columns = "columns" :get-data-config = "getDataConfig"></ivu-table>
        <!--编辑用户对话框-->
        <Modal v-model = "userModal" width = "500">
            <p slot = "header" style = "text-align: center">
                <span>修改用户信息</span>
            </p>
            <div style = "margin-left: 3%">
                <label>用户名: </label>
                <div style = "margin-left: 20%; width: 45%; display: inline-block; vertical-align: middle;">
                    <i-input v-model = "editModal.name"></i-input>
                </div>
            </div>
            <div style = "margin-left: 3% ;margin-top:2%">
                <label>账号: </label>
                <div style = "margin-left: 22%; width: 45%; display: inline-block; vertical-align: middle;">
                    <i-input  v-model = "editModal.passport"></i-input>
                </div>
            </div>
            <div style = "margin: 3%">
                <label style = "display: inline-block">已关联子站点：</label>
                <div style = "margin-left: 8%; width: 45%; display: inline-block">
                    <Select v-model = "editModal.searchSite" clearable filterable remote :remote-method = "searchSiteByName" :loading = "loadingType" style = "width:200px;margin-left:8px" placeholder = "下拉或选择要关联的子站点" @on-change="addSite">
                        <Option v-for = "site in editModal.siteList" :value = "site.name" :key = "site.id">{{ site.name }}</Option>
                    </Select>
                </div>
            </div>
            <div style="margin: 3%">
                <ul class="site-list">
                    <li v-for="(selectedSite,index) in editModal.selectedSiteList"  :key="selectedSite.id">
                        {{selectedSite.name}}
                        <Button slot="append" icon="ios-close-empty" style = "height: 100%;" @click = "clearSite(index)"></Button>
                    </li>
                </ul>
            </div>
            <div slot = "footer" style = "text-align: center">
                <Button size = "large" type = "primary" @click = "updateSetting">提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import api from '../../api.js'

    export default {
        name: 'SearchUser',
        components: {
            IvuTable: UI.IvuTable,
        },
        data(){
            return {
                filterSite: '',
                optionSites: [],
                userModal: false,
                loadingType: false,
                selectedUser: '',
                editModal: {
                    id: '',
                    name: '',
                    searchSite: '',
                    passport: '',
                    selectedSiteList: [],
                    siteList: [],
                },
                deleteModal: {
                    id: '',
                    name: '',
                },
                columns: [
                    {
                        title: '账号',
                        key: 'passport',
                        align: 'center',
                    },
                    {
                        title: '用户名',
                        key: 'name',
                        align: 'center',
                    },
                    {
                        title: '创建时间',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', this.formatTime(params.row.createTime));
                        },

                    },
                    {
                        title: '创建人',
                        key: 'creator',
                        align: 'center',
                    },
                    {
                        title: '管理站点',
                        key: 'sites',
                        align: 'center',
                        render: (h,params) => {
                            return h('Select', {
                                    props: {
                                        value: params.row.sites[0].name,
                                    },
                                },
                                params.row.sites.map(
                                    data => {
                                        return h('Option', {
                                            props: {
                                                value: data.name
                                            },
                                        })
                                    }
                                )
                            )
                        }

                        /*render: (h,params) => {
                           return h('Select', params.row.sites.map(
                               data => {
                                   return h("Option",{
                                       props: {
                                           value: data.name,
                                       }
                                   })
                               }
                           )
                           )
                        },*/
                    },
                    {
                        title: '操作',
                        align: 'center',
                        render: (h, params) => {
                            return h('div',[
                                h('i-button', {
                                    style: {
                                        marginRight: '10%',
                                    },
                                    on: {
                                        click: () => {
                                            this.userModal = true
                                            this.editModal.name = params.row.name
                                            this.editModal.id = params.row.id
                                            this.editModal.passport = params.row.passport
                                            this.editModal.selectedSiteList = params.row.sites
                                        }
                                    },
                                }, '修改'),
                                h('i-button', {
                                    on: {
                                        click: () => {
                                            this.deleteModal.id = params.row.id
                                            this.deleteModal.name = params.row.name
                                            this.deleteConfirm()
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    },
                ],
                getDataConfig: {
                    getFunc: api[TYPES.USER.GETUSER],
                    params: {
                        keyword: '',
                        scode: '',
                        page: '',
                        size: '',
                    }
                },
            }
        },
        methods: {
            formatTime(time) {
                var tempTime = new Date(time)
                return tempTime.toLocaleString()
            },
            getSecSites(){
                var getSite = api[TYPES.SITE.GETSITE]
                var params = {type: 1}
                getSite(params).then(
                    data => {
                        this.optionSites = data
                    },
                    err => {
                        this.$Notice.error({
                            title: '获取二级站点出错',
                            desc: JSON.stringigy(err),
                            duration: 4,
                        })
                    }
                )
            },
            //根据二级站点名称搜索
            searchByUser() {
                this.getDataConfig = {...this.getDataConfig}
                this.getDataConfig.getFunc = api[TYPES.USER.GETUSER]
                this.getDataConfig.params.name = this.filterSite
                console.log(this.getDataConfig.params.name)
                this.selectedUser = ''
            },
            //根据用户名称搜索
            searchByName() {
                this.getDataConfig = {...this.getDataConfig}
                this.getDataConfig.getFunc = api[TYPES.USER.SEARCHUSER]
                this.getDataConfig.params.keyword = this.selectedUser
                this.filterSite = ''
            },
            searchSiteByName(query){
                var searchSiteMethod = api[TYPES.SITE.SEARCHSITE]
                if(query !== ''){
                    this.loadingType = true;
                    var params = {
                        keyword: query,
                        page: 1,
                        size: 10,
                    }
                    setTimeout(() => {
                        this.loadingType = false;
                        searchSiteMethod(params).then(
                            data => {
                                this.editModal.siteList = data.data;
                            }
                        )
                    }, 200);
                } else {
                    this.editModal.siteList = [];
                }
            },
            addSite(){
                if (!this.editModal.searchSite)
                    return
                var target = this.editModal.selectedSiteList.find(item => item.name == this.editModal.searchSite);
                if (target)
                    return
                var temp = this.editModal.siteList.find(item => item.name == this.editModal.searchSite);
                this.editModal.selectedSiteList.push(temp)
            },
            clearSite(index){
                this.editModal.selectedSite = '',
                    this.editModal.selectedSiteList.splice(index, 1)
            },
            deleteConfirm() {
                this.$Modal.confirm({
                        title: '确认提示',
                        content: '<p>删除后不可恢复，是否确定删除该用户？</p>',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                            var deleteFunc = api[TYPES.USER.DELETEUSER]
                            var params = {
                                userId: this.deleteModal.id
                            }
                            deleteFunc(params).then(
                                data => {
                                    this.$Notice.success({
                                        title: '删除用户成功',
                                        desc: '用户已删除',
                                        duration: 4,
                                    })
                                    this.getDataConfig = {...this.getDataConfig}
                                },
                                err => {
                                    this.$Notice.error({
                                        title: '删除用户出错',
                                        desc: JSON.stringify(err),
                                        duration: 4,
                                    })
                                }
                            )
                        },
                    },
                )//confirm结束
            },
            updateSetting() {
                //获取子站点列表
                var tempSite = []
                this.editModal.selectedSiteList.map(
                    data => {
                        tempSite.push(data.scode)
                        return tempSite
                    }
                )
                var params = {
                    userId: this.editModal.id,
                    name: this.editModal.name,
                    passport: this.editModal.passport,
                    json: tempSite,
                }
                var updateMethod = api[TYPES.USER.UPDATEUSER]
                updateMethod({...params}).then(
                    data => {
                        this.$Notice.success({
                            title: '更新通知',
                            desc: '用户信息修改成功',
                            duration: 4,
                        })
                        this.getDataConfig = {...this.getDataConfig}
                    },
                    err => {
                        this.$Notice.error({
                            title: '用户信息修改出错',
                            desc: JSON.stringify(err),
                            duration: 4,
                        })
                    }
                )
                this.userModal = false
            },
        },
        created(){
            setTimeout(()=> {
                this.getDataConfig = {...this.getDataConfig}
                this.getDataConfig.params.keyword = 'h'
            }, 5000)
        },
        mounted(){
            this.getSecSites()
        },
    }
</script>
<style>
    .site-list li {
        list-style-type: none;
        display: inline-block;
        height: 5%;
        margin: 1% 1%;
        vertical-align: middle;
        border: 1px solid #dddee1;
        border-radius: 5px;
    }
</style>