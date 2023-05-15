<template>
  <div class="engineer-case">
    <div class="add-engineer-case">
      <div class="title">
        <h1>工程案例展示</h1>
      </div>
      <button
        type="button"
        class="el-button el-button--primary el-button--small"
        @click="addEngineerCase"
      >
        <span>添加工程案例</span>
      </button>
    </div>
    <div class="engineer-case-show">
      <el-row :gutter="20">
        <el-col v-for="(item, index) in engineerCaseInfo" :key="index" :span="6">
          <el-card>
            <div :class="[showDeleteIcon?'showIcon':'hideIcon','image-info']" @mouseover="showDeleteIconOp(index)" @mouseout="showDeleteIcon=false">
              <img
                :src="item.url"
                class="image"
                @click="editEngineer(item)"
              >
              <span
                v-if="index === nowChooseImgIndex"
                class="delete-icon"
                @click="deletePic(item)"
                @mouseover="showDeleteIconOp(index)"
                @mouseout="showDeleteIcon = false"
              >
                <i class="el-icon-delete" />
              </span>
              <div class="sub-title">
                <span>{{ item.title }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="page"
          :page-sizes="[8, 16, 24, 30]"
          :limit.sync="limit"
          @pagination="getTotalAndEngineerCase"
        />
      </el-row>
      <h4 v-if="showNoDataDialog" class="no-engineer-case">没有任何工程案例</h4>
    </div>
    <el-dialog title="添加工程案例" :visible.sync="showAddDialogForm">
      <el-form
        ref="uploadForm"
        :model="uploadForm"
        :rules="rules"
        label-width="100px"
        class="upload-ruleForm"
      >
        <el-form-item label="文件上传" prop="uploadFiles">
          <el-upload
            class="upload-from"
            :action="UploadUrl()"
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
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
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
        <el-button type="primary" @click="addEngineerCaseOp('uploadForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑工程案例" :visible.sync="showEditDialogForm">
      <el-form
        ref="uploadForm"
        :model="uploadForm"
        :rules="rules"
        label-width="100px"
        class="upload-ruleForm"
      >
        <el-form-item label="文件上传" prop="uploadFiles">
          <el-upload
            class="upload-from"
            :action="UploadUrl()"
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
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
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
        <el-button type="primary" @click="updateEngineerCase('uploadForm')">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  createEngineerCase,
  findById,
  updateEngineerCase,
  deleteEngineerCase
} from '@/api/engineerCase'
import MarkdownEditor from '@/components/MarkdownEditor'
import { interfaceUrl } from '@/utils/environment'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
export default {
  components: { Pagination, MarkdownEditor },
  data() {
    return {
      nowChooseImgIndex: -1,
      showDeleteIcon: false, // 是否显示删除按钮
      showNoDataDialog: false,
      uploadUrl: '',
      productOptions: [],
      fileList: [],
      engineerCaseInfo: [],
      showAddDialogForm: false,
      showEditDialogForm: false,
      dialogVisible: false,
      uploadForm: {
        id: '',
        uploadFiles: [],
        content: ''
      },
      page: 1,
      limit: 8,
      total: 0, // 总条数
      formLabelWidth: '120px',
      rules: {
        uploadFiles: [
          {
            required: true,
            message: '请选择文件上传',
            trigger: 'change'
          }
        ],
        content: [
          {
            required: true,
            message: '请输入案例内容',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['username', 'userId'])
  },
  created: function() {},
  mounted() {
    this.uploadUrl = interfaceUrl()
    this.getTotalAndEngineerCase()
  },
  methods: {
    showDeleteIconOp(index) {
      this.showDeleteIcon = true
      this.nowChooseImgIndex = index
    },
    hideDeleteIcon() {
      this.showDeleteIcon = false
    },
    deletePic(item) {
      this.$confirm('确定要删除该工程案例吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const params = {
            id: item.id,
            username: this.username
          }
          deleteEngineerCase(params).then(res => {
            if (res && res.code === 0) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getTotalAndEngineerCase()
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
    getTotalAndEngineerCase() {
      const params = {
        userId: this.userId,
        page: this.page,
        limit: this.limit
      }
      fetchList(params).then(res => {
        if (res.code === 0) {
          const data = res.data
          if (data.engineerCase && data.engineerCase.length > 0) {
            this.showNoDataDialog = false
            this.engineerCaseInfo = data.engineerCase
            this.total = data.count
          } else {
            this.showNoDataDialog = true
          }
        }
      })
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
    addEngineerCase() {
      this.showAddDialogForm = true
      this.uploadForm.uploadFiles = []
      this.fileList = []
    },
    updateEngineerCase(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            id: this.uploadForm.id,
            title: this.uploadForm.uploadFiles[0].value,
            url: this.uploadForm.uploadFiles[0].name,
            userId: this.userId,
            content: this.uploadForm.content
          }
          params.files = this.dealDiffEnvUrlPre(params.files)
          updateEngineerCase(params).then(res => {
            if (res.code === 0) {
              this.$refs[formName].resetFields()
              this.showEditDialogForm = false
              this.$message({
                message: '工程案例修改成功',
                type: 'success'
              })
              this.getTotalAndEngineerCase()
            }
          })
        }
      })
    },
    editEngineer(item) {
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
            this.fileList.push({
              name: data.title,
              url: data.url
            })
            this.showEditDialogForm = true
          }
        }
      })
    },
    addEngineerCaseOp(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            files: this.uploadForm.uploadFiles,
            userId: this.userId,
            content: this.uploadForm.content
          }
          params.files = this.dealDiffEnvUrlPre(params.files)
          createEngineerCase(params).then(res => {
            if (res.code === 0) {
              this.$refs[formName].resetFields()
              this.showAddDialogForm = false
              this.$message({
                message: '工程案例添加成功',
                type: 'success'
              })
              this.getTotalAndEngineerCase()
            }
          })
        }
      })
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
    dealDiffEnvUrlPre(files) {
      if (this.uploadUrl !== '/dev-api') {
        if (files && files.length > 0) {
          files.forEach(item => {
            const name = item.name
            item.name =
              'http://172.29.170.216:9527/upload/postImg/' +
              name.substring(name.lastIndexOf('/') + 1)
          })
        }
      }
      return files
    },
    UploadUrl() {
      return this.uploadUrl + '/uploadImgsForPost'
    }
  }
}
</script>

<style lang="scss">
.engineer-case {
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .add-engineer-case {
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
  .engineer-case-show {
    padding: 20px;
    padding-top: 0;
    .no-engineer-case {
      color: #333;
    }
    .image {
      width: 100%;
      height: 220px;
      border: 1px solid #f0f0f0;
    }
    .image-info {
      position: relative;
      .sub-title {
        font-size: 16px;
        display: block;
        max-width: 100%;
        _width: 100%;
        white-space: nowrap;
        word-wrap: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 0;
        margin-left: 0;
        padding: 10px;
        background-image: -webkit-gradient(
          linear,
          left top,
          left bottom,
          from(rgba(255, 255, 255, 0)),
          to(rgba(26, 26, 26, 0.4))
        );
        background-image: linear-gradient(
          rgba(255, 255, 255, 0),
          rgba(26, 26, 26, 0.4)
        );
      }
    }
    .delete-icon {
      position: absolute;
      z-index: 999999999;
      line-height: 50px;
      right: 8px;
      bottom: -7px;
      display: none;
      color: #6a5555;
    }
    .showIcon {
      .delete-icon {
        display: inline-block;
      }
    }
    .hideIcon {
      .delete-icon {
        display: none;
      }
    }
    .el-col {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .icon_imgclose {
    cursor: pointer;
    font-size: 44px;
    color: #9ba3af !important;
    font-weight: 100;
    position: fixed;
    top: 12px;
    right: 40px;
    z-index: 99999;
  }

  .upload-from {
    display: inline;
    .el-upload__tip {
      display: inline;
      margin-left: 10px;
    }
  }
  .pagination-container {
    text-align: right;
    padding: 0;
    margin: 0;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: '';
  }
  .clearfix {
    &:after {
      clear: both;
    }
  }
}
</style>
