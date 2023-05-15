<template>
  <div class="home">
    <div class="add-product">
      <div class="title">
        <h1>产品列表展示</h1>
      </div>
      <el-select v-model="filterType" placeholder="请选择产品类型">
        <el-option
          v-for="item in productOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >搜索</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="addProduct"
      >添加产品</el-button>
    </div>
    <div class="product-show">
      <el-table :data="productListData" style="width: 100%">
        <el-table-column label="ID" prop="id" align="center" width="80">
          <template slot-scope="{ row }">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品" width="180">
          <template slot-scope="scope">
            <img style="width: 80px; height: 30px" :src="scope.row.url">
          </template>
        </el-table-column>
        <el-table-column label="产品名称" min-width="100px">
          <template slot-scope="{ row }">
            <template v-if="row.edit">
              <el-input
                v-model="row.title"
                class="edit-input"
                size="small"
                @blur="confirmEdit(row)"
              />
              <!-- <el-button class="cancel-btn" size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(row)">
               cancel
             </el-button> -->
            </template>
            <span v-else @click="row.edit = !row.edit">{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="内容"
          min-width="150px"
          prop="content"
          show-overflow-tooltip
        />>
        <el-table-column label="所属类型" width="100px">
          <template slot-scope="{ row }">
            <span>{{ row.productTypeId | dealType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span style="margin-left: 10px">{{
              $moment(scope.row.created_at).format("YYYY-MM-DD hh:mm:ss")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >删除</el-button>
            <!-- <el-button v-if="scope.row.edit" type="success" size="small" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)">
              OK
            </el-button>
            <el-button v-else type="primary" size="small" icon="el-icon-edit" @click="scope.row.edit=!scope.row.edit">
              标题修改
            </el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getTotalAndProducts"
      />
    </div>
    <el-dialog title="添加产品" :visible.sync="showAddDialogForm">
      <el-form
        ref="uploadForm"
        :model="uploadForm"
        :rules="rules"
        label-width="100px"
        class="upload-ruleForm"
      >
        <el-form-item label="产品类型" prop="type">
          <el-select v-model="uploadForm.type" placeholder="请选择产品类型">
            <el-option
              v-for="item in productOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="文件上传" prop="uploadFiles">
          <el-upload
            class="upload-demo"
            :action="UploadUrl()"
            multiple
            :limit="1"
            :before-upload="beforeUpload"
            :on-exceed="handleExceed"
            :on-remove="handleRemove"
            :on-success="handleFileSuccess"
            :file-list="fileList"
            :show-file-list="true"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <markdown-editor
            ref="markdownEditor"
            v-model="uploadForm.content"
            :options="{ hideModeSwitch: true, previewStyle: 'tab' }"
            height="200px"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAddDialogForm = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addProductsOp('uploadForm')"
        >确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑产品" :visible.sync="showEditDialogForm">
      <el-form
        ref="uploadForm"
        :model="uploadForm"
        :rules="rules"
        label-width="100px"
        class="upload-ruleForm"
      >
        <el-form-item label="产品类型" prop="type">
          <el-select v-model="uploadForm.type" placeholder="请选择产品类型">
            <el-option
              v-for="item in productOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="文件上传" prop="uploadFiles">
          <el-upload
            class="upload-demo"
            :action="UploadUrl()"
            multiple
            :limit="1"
            :before-upload="beforeUpload"
            :on-exceed="handleExceed"
            :on-remove="handleRemove"
            :on-success="handleFileSuccess"
            :file-list="fileList"
            :show-file-list="true"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <markdown-editor
            ref="markdownEditor"
            v-model="uploadForm.content"
            :options="{ hideModeSwitch: true, previewStyle: 'tab' }"
            height="200px"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showEditDialogForm = false">取 消</el-button>
        <el-button
          type="primary"
          @click="updateProduct('uploadForm')"
        >编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  createProduct,
  findById,
  updateProduct,
  deleteProduct
} from '@/api/product'
import { interfaceUrl } from '@/utils/environment'
import { getTotalTypeList } from '@/api/productType'
import { mapGetters } from 'vuex'
import MarkdownEditor from '@/components/MarkdownEditor'
import Pagination from '@/components/Pagination'
let that
export default {
  components: { MarkdownEditor, Pagination },
  filters: {
    dealType: function(typeId) {
      return that.typeObj[typeId]
    }
  },
  data() {
    return {
      uploadUrl: '',
      productOptions: [],
      typeObj: {}, // 用来处理产品类型
      filterType: '',
      fileList: [],
      urlList: [],
      downloadurl: '',
      showAddDialogForm: false,
      showEditDialogForm: false,
      dialogVisible: false,
      productListData: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      uploadForm: {
        type: '',
        uploadFiles: [],
        content: ''
      },
      rules: {
        uploadFiles: [
          {
            required: true,
            message: '请选择文件上传',
            trigger: 'change'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择一个产品类型',
            trigger: 'change'
          }
        ],
        content: [
          {
            required: true,
            message: '请输入对产品的描述',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  beforeCreate: function() {
    that = this
  },
  computed: {
    ...mapGetters(['username', 'userId'])
  },
  mounted() {
    this.uploadUrl = interfaceUrl()
    this.getProductTypes()
    this.getTotalAndProducts()
  },
  methods: {
    updateProduct(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            id: this.uploadForm.id,
            title: this.uploadForm.uploadFiles[0].value,
            url: this.uploadForm.uploadFiles[0].name,
            userId: this.userId,
            content: this.uploadForm.content
          }
          updateProduct(params).then(res => {
            if (res.code === 0) {
              this.$refs[formName].resetFields()
              this.showEditDialogForm = false
              this.$message({
                message: '产品修改成功',
                type: 'success'
              })
              this.getTotalAndProducts()
            }
          })
        }
      })
    },
    handleFilter() {
      this.getTotalAndProducts()
    },
    cancelEdit(row) {
      row.title = row.originalTitle
      row.edit = false
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.originalTitle = row.title
      const params = {
        id: row.id,
        title: row.title,
        url: row.url,
        userId: row.userId,
        content: row.content
      }
      updateProduct(params).then(res => {
        if (res.code === 0) {
          this.$message({
            message: 'The title has been edited',
            type: 'success'
          })
        }
      })
    },
    handleEdit(row) {
      this.editProduct(row)
    },
    editProduct(item) {
      this.fileList = []
      const params = {
        id: item.id
      }
      findById(params).then(res => {
        if (res.code === 0) {
          const data = res.data
          if (data) {
            this.uploadForm.id = data.id
            this.uploadForm.content = data.content
            this.uploadForm.uploadFiles.push({
              value: data.title,
              name: data.url
            })
            this.uploadForm.type = data.productTypeId
            this.fileList.push({
              name: data.title,
              url: data.url
            })
            this.showEditDialogForm = true
          }
        }
      })
    },
    handleDelete(row) {
      this.deletePic(row)
    },
    deletePic(item) {
      this.$confirm('确定要删除该产品吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const params = {
            id: item.id,
            username: this.username,
            productTypeId: item.productTypeId
          }
          deleteProduct(params).then(res => {
            if (res && res.code === 0) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getTotalAndProducts()
            } else {
              this.$message({
                type: 'error',
                message: '您无权删除此产品'
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
    getTotalAndProducts() {
      const params = {
        productTypeId: this.filterType ? this.filterType : -1,
        page: this.listQuery.page,
        limit: this.listQuery.limit
      }
      fetchList(params).then(res => {
        const { code, data } = res
        if (code === 0) {
          this.productListData = data.products
          this.productListData = data.products.map(v => {
            this.$set(v, 'edit', false)
            v.originalTitle = v.title
            return v
          })
          this.total = data.count
        }
      })
    },
    getProductTypes() {
      getTotalTypeList().then(res => {
        if (res && res.code === 0) {
          this.productOptions = this.formateRes(
            res.data && res.data.productTypes
          )
        }
      })
    },
    formateRes(data) {
      const dealRes = []
      if (data && data.length > 0) {
        data.forEach(arr => {
          const optObj = {}
          optObj.label = arr.type
          optObj.value = arr.id
          this.typeObj[arr.id] = arr.type
          dealRes.push(optObj)
        })
      }
      return dealRes
    },
    handleFileSuccess(res, file) {
      const fileInfo = {}
      if (res.errno === 0) {
        fileInfo.name = file.response.data && file.response.data[0]
        fileInfo.value = file.name
        this.uploadForm.uploadFiles.push(fileInfo)
        this.$refs['uploadForm'].clearValidate()
      }
    },
    addProduct() {
      this.showAddDialogForm = true
      this.uploadForm.uploadFiles = []
      this.fileList = []
    },
    addProductsOp(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            productTypeId: this.uploadForm.type,
            files: this.uploadForm.uploadFiles,
            userId: this.userId,
            content: this.uploadForm.content
          }
          params.files = this.dealDiffEnvUrlPre(params.files)
          createProduct(params).then(res => {
            if (res.code === 0) {
              this.$refs[formName].resetFields()
              this.showAddDialogForm = false
              this.$message({
                message: '产品添加成功',
                type: 'success'
              })
              this.getTotalAndProducts()
            }
          })
        }
      })
    },
    dealDiffEnvUrlPre(files) {
      if (this.uploadUrl !== '/dev-api') {
        if (files && files.length > 0) {
          files.forEach(item => {
            const name = item.name
            item.name = name.substring(name.lastIndexOf('/') + 1)
          })
        }
      }
      return files
    },
    handleRemove(file, fileList) {
      if (file.status === 'success') {
        this.uploadForm.uploadFiles = this.uploadForm.uploadFiles.filter(
          currentValue => {
            return currentValue.value !== file.name
          }
        )
      }
    },
    beforeUpload(file) {
      if (this.uploadForm.type) {
        const isJPG = file.type === 'image/jpeg'
        const isPNG = file.type === 'image/png'
        const isLt1M = file.size / 1024 / 1024 <= 1
        const isAllowType = isJPG || isPNG
        let flag = true
        if (!isJPG && !isPNG) {
          this.$message.error('上传图片必须是jpg/png')
        }
        if (!isLt1M) {
          this.$message.error({
            message: '您上传的单个文件大小超过1MB,请重新上传。',
            success: false
          })
        }
        this.uploadForm.uploadFiles.forEach(currentValue => {
          if (currentValue.value === file.name) {
            this.$message.error({
              message: '您上传的文件已存在，请重新选择',
              success: false
            })
            flag = false
          }
        })
        return isAllowType && isLt1M && flag
      } else {
        this.$message.error({
          message: '请先选择一个产品类型，再开始上传文件',
          success: false
        })
        return false
      }
    },
    handleExceed(files, fileList) {
      this.$message.error('当前限制最多选择1个文件')
    },
    handleError(res) {
      if (res.status && res.status === 403) {
        this.$message.error({
          message: '您上传的单个文件大小超过1MB，请重新上传。',
          success: false
        })
      }
    },
    UploadUrl() {
      return this.uploadUrl + '/uploadImgsForPost'
    }
  }
}
</script>

<style lang="scss">
.home {
  .add-product {
    text-align: right;
    margin-right: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    .title {
      h1 {
        float: left;
        padding: 0;
        margin: 0;
        color: #304156;
        font-size: 20px;
        margin-left: 20px;
        display: block;
        font-weight: 800;
        line-height: 26px;
      }
    }
  }
  .pagination-container {
    text-align: right;
    padding: 0;
    padding-bottom: 20px;
  }
}
</style>
