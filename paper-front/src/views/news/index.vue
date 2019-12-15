<template>
  <div class="app-container news">
    <div class="filter-container">
      <p class="title">新闻动态列表</p>
      <el-input
        v-model="listQuery.title"
        placeholder="Title"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >Search</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >Add</el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" style="width: 100%;">
      <el-table-column label="ID" prop="id" align="center" width="80">
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Title" min-width="150px">
        <template slot-scope="{ row }">
          <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Date" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.updatedAt | parseTime("{y}-{m}-{d} {h}:{i}:{s}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="views" align="center" width="95" prop="views" />>
      <el-table-column
        label="Actions"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="newsForm"
        :rules="rules"
        :model="newsForm"
        label-position="left"
        label-width="70px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="newsForm.title" placeholder="请输入新闻标题（必填）" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <markdown-editor
            ref="markdownEditor"
            v-model="newsForm.content"
            :options="{ hideModeSwitch: true, previewStyle: 'tab' }"
            height="200px"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >Confirm</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, deleteNew, createNew, updateNew } from '@/api/news'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import MarkdownEditor from '@/components/MarkdownEditor'
import { mapGetters } from 'vuex'

export default {
  name: 'ComplexTable',
  components: { Pagination, MarkdownEditor },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      newsForm: {
        id: '',
        title: '',
        content: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑新闻信息',
        create: '添加新闻信息'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        title: [{ required: true, message: '请填写新闻标题', trigger: 'blur' }],
        content: [
          {
            required: true,
            message: 'content is required',
            trigger: 'blur'
          }
        ]
      },
      downloadLoading: false
    }
  },
  computed: {
    ...mapGetters(['username', 'userId'])
  },
  created() {
    this.getList()
  },
  mounted() {
    // this.username = this.$store.state.user.username
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listQuery.userId = this.userId
      fetchList(this.listQuery).then(res => {
        if (res.code === 0) {
          const news = res.data.news
          if (news && news.length > 0) {
            this.list = news
            this.total = res.data.count
          }
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetNewsForm() {
      this.newsForm.id = ''
      this.newsForm.title = ''
      this.newsForm.content = ''
    },
    handleCreate() {
      this.resetNewsForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['newsForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['newsForm'].validate(valid => {
        if (valid) {
          this.newsForm.username = this.username
          createNew(this.newsForm).then(res => {
            if (res && res.code === 0) {
              this.dialogFormVisible = false
              this.$message({
                title: 'Success',
                message: 'Created Successfully',
                type: 'success',
                duration: 2000
              })
              this.getList()
            }
          })
        }
      })
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const params = {
            id: row.id,
            userId: row.id,
            username: this.username
          }
          deleteNew(params).then(res => {
            if (res && res.code === 0) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              setTimeout(() => {
                this.getList()
              }, 0)
            } else {
              this.$message({
                type: 'error',
                message: '您无权删除此数据'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleUpdate(row) {
      this.newsForm.id = row.id
      this.newsForm.title = row.title
      this.newsForm.content = row.content
      this.newsForm.userId = row.userId
      this.newsForm.username = this.username
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['newsForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['newsForm'].validate(valid => {
        if (valid) {
          updateNew(this.newsForm).then(res => {
            if (res && res.code === 0) {
              this.dialogFormVisible = false
              this.$message({
                title: 'Success',
                message: 'Update Successfully',
                type: 'success',
                duration: 2000
              })
              this.getList()
            }
          })
        }
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    }
  }
}
</script>

<style lang="scss">
.news {
  .filter-container {
    text-align: right;
    .title {
      float: left;
      margin-left: 30px;
      font-size: 16px;
      color: #97a8be;
    }
  }
  .pagination-container {
    text-align: right;
  }
}
</style>
