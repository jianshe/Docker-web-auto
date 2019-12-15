<template>
  <div class="app-container news">
    <div class="filter-container">
      <p class="title">产品类型列表</p>
      <el-input
        v-model="listQuery.type"
        placeholder="请输入产品类型"
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
    <el-table v-loading="listLoading" :data="productTypeList" style="width: 100%;">
      <el-table-column label="ID" prop="id" align="center" width="80">
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Type" min-width="150px">
        <template slot-scope="{ row }">
          <span class="link-type" @click="handleUpdate(row)">{{ row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Desc" min-width="150px" prop="desc" />>
      <el-table-column label="Date" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.updatedAt | parseTime("{y}-{m}-{d} {h}:{i}:{s}") }}</span>
        </template>
      </el-table-column>
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
        ref="productTypeForm"
        :rules="rules"
        :model="productTypeForm"
        label-position="left"
        label-width="80px"
      >
        <el-form-item label="产品类型" prop="type">
          <el-input v-model="productTypeForm.type" placeholder="请输入产品类型（必填）" />
        </el-form-item>
        <el-form-item label="产品描述" prop="desc">
          <el-input v-model="productTypeForm.desc" type="textarea" placeholder="请输入产品描述（必填）" />
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
  </div>
</template>

<script>
import {
  fetchTypeList,
  deleteProductType,
  createProductType,
  updateProductType
} from '@/api/productType'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { mapGetters } from 'vuex'

export default {
  name: 'ComplexTable',
  components: { Pagination },
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
      productTypeList: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      productTypeForm: {
        id: '',
        type: '',
        desc: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑产品类型',
        create: '添加产品类型'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: '请输入产品类型', trigger: 'blur' }],
        desc: [
          {
            required: true,
            message: '请输入产品描述',
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
  methods: {
    getList() {
      this.listLoading = true
      fetchTypeList(this.listQuery).then(res => {
        if (res.code === 0) {
          const productTypeObj = res.data.productTypes
          if (productTypeObj && productTypeObj.productTypes.length > 0) {
            this.productTypeList = productTypeObj.productTypes
            this.total = productTypeObj.count
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
    resetProductTypeForm() {
      this.productTypeForm.id = ''
      this.productTypeForm.type = ''
      this.productTypeForm.desc = ''
    },
    handleCreate() {
      this.resetProductTypeForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['productTypeForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['productTypeForm'].validate(valid => {
        if (valid) {
          this.productTypeForm.userId = this.userId
          createProductType(this.productTypeForm).then(res => {
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
      this.$confirm(
        '删除该产品类型会删除该产品类型下的所有产品, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          const params = {
            id: row.id
          }
          deleteProductType(params).then(res => {
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
                message: '服务器忙，请稍候再试'
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
      this.productTypeForm.id = row.id
      this.productTypeForm.type = row.type
      this.productTypeForm.desc = row.desc
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['productTypeForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['productTypeForm'].validate(valid => {
        if (valid) {
          updateProductType(this.productTypeForm).then(res => {
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
