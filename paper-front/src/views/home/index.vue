<template>
  <div class="home">
    <div class="add-product">
      <div class="title">
        <h1>产品种类展示</h1>
      </div>
      <button
        type="button"
        class="el-button el-button--primary el-button--small"
        @click="addProduct"
      >
        <span>添加产品</span>
      </button>
    </div>
    <div class="product-show">
      <el-row :gutter="20">
        <el-col v-for="(item, index) in productsInfo" :key="index" :span="6">
          <el-card>
            <div class="image-info">
              <img
                v-if="item.firstUrl"
                :src="item.firstUrl"
                class="image"
                @click="showBigImgFun(item.products)"
              >
              <img v-else src="../../assets/default.jpg" class="image">
              <div class="sub-title">
                <span>{{ item.type }}</span>
              </div>
              <span class="pic-num-wrap">
                <span class="pic-num">{{ item.count }}</span>
              </span>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <h4 v-if="showNoDataDialog" class="no-product">没有任何产品</h4>
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
            :limit="5"
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAddDialogForm = false">取 消</el-button>
        <el-button type="primary" @click="addProductsOp('uploadForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      v-if="showBigImg"
      title
      :visible.sync="showBigImg"
      width="740px"
      top="100px"
      :close-on-click-modal="true"
      :show-close="false"
      :lock-scroll="true"
      class="lunbo_bg"
    >
      <div id="imgdia" class="bigimg_bg" tabindex="0">
        <el-carousel
          ref="lunboitem"
          arrow="always"
          class="lunbo"
          height="435px"
          indicator-position="none"
          :autoplay="false"
          :loop="false"
        >
          <el-carousel-item v-for="(item, index) in urlList" :key="index" :name="item.url">
            <div :class="['carousel-img-style', showDeleteIcon?'showIcon':'hideIcon']">
              <img
                :src="item.url"
                class="img_item"
                @mouseover="showDeleteIcon = true"
                @mouseout="hideDeleteIcon()"
              >
              <span
                class="delete-icon"
                @click="deletePic(item)"
                @mouseover="showDeleteIcon = true"
                @mouseout="hideDeleteIcon()"
              >
                <i class="el-icon-delete" />
              </span>
            </div>
            <div class="img_name">{{ item.title }}</div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, createProduct, deleteProduct } from '@/api/product'
import { interfaceUrl } from '@/utils/environment'
import { getTotalTypeList } from '@/api/productType'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      showDeleteIcon: false, // 是否显示删除按钮
      showNoDataDialog: false,
      uploadUrl: '',
      inputValue: '',
      productOptions: [],
      showBigImg: false,
      fileList: [],
      productsInfo: [],
      urlList: [],
      downloadurl: '',
      showAddDialogForm: false,
      dialogVisible: false,
      uploadForm: {
        type: '',
        uploadFiles: []
      },
      formLabelWidth: '120px',
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
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['username', 'userId'])
  },
  watch: {
    showbigimg(val) {
      if (val === true) {
        setTimeout(function() {
          document.getElementById('imgdia').focus()
        }, 30)
      }
    },
    nowurl(val) {
      if (val) {
        const that = this
        setTimeout(function() {
          that.$refs.lunboitem.setActiveItem(val.url)
        }, 30)
      }
    }
  },
  created: function() {
    const that = this
    document.onkeydown = function(e) {
      const key = window.event.keyCode
      if (that.showbigimg) {
        if (key === 37) {
          that.golastnew()
        }
        if (key === 39) {
          that.gonextnew()
        }
      }
    }
  },
  mounted() {
    this.uploadUrl = interfaceUrl()
    this.getTotalAndProducts()
  },
  methods: {
    hideDeleteIcon() {
      this.showDeleteIcon = false
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
              this.showBigImg = false
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
      fetchList().then(res => {
        if (res.code === 0) {
          this.productsInfo = this.dealProductsInfo(res.data)
        }
      })
    },
    dealProductsInfo(datas) {
      if (datas && datas.length > 0) {
        datas.forEach(data => {
          const products = data.products
          if (products && products.length > 0) {
            data.firstUrl = products[0].url
          } else {
            data.firstUrl = ''
          }
        })
        return datas
      }
    },
    getProductTypes() {
      getTotalTypeList().then(res => {
        if (res && res.code === 0) {
          this.productOptions = this.formateRes(
            res.data && res.data.productTypes
          )
          this.showNoDataDialog = false
        } else {
          this.showNoDataDialog = true
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
      // this.saveFileToDataBase(file.name, fileInfo.name)
    },
    saveFileToDataBase(title, url) {
      const params = {
        productTypeId: this.uploadForm.type,
        userId: this.userId,
        url: url,
        title: title
      }
      createProduct(params).then(res => {
        if (res.code === 0) {
          this.$message({
            message: '产品添加成功',
            type: 'success'
          })
        }
      })
    },
    addProduct() {
      this.showAddDialogForm = true
      this.uploadForm.uploadFiles = []
      this.fileList = []
      this.getProductTypes()
    },
    addProductsOp(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            productTypeId: this.uploadForm.type,
            files: this.uploadForm.uploadFiles,
            userId: this.userId
          }
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
    showBigImgFun(products) {
      this.showBigImg = true
      this.urlList = products
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
      this.$message.error('当前限制最多选择5个文件')
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
    },
    handelcloseimg() {
      this.$emit('closeimg')
    },
    golastnew() {
      // this.$refs.lunboitem.prev()
      if (this.nowimg === 0) {
        alert('当前为第一张')
      } else {
        this.$refs.lunboitem.prev()
      }
    },
    gonextnew() {
      // this.$refs.lunboitem.next()
      if (this.nowimg === this.urlList.length - 1) {
        // utils.message('当前为最后一张', 'warning')
      } else {
        this.$refs.lunboitem.next()
      }
    }
  }
}
</script>

<style lang="scss">
.home {
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
  .product-show {
    padding: 20px;
    padding-top: 0;
    .no-product {
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
        display: inline-block;
        max-width: 100%;
        _width: 100%;
        white-space: nowrap;
        word-wrap: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 16px;
        margin-left: 10px;
      }
      .pic-num-wrap {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 50px;
        text-align: right;
        background-image: -webkit-linear-gradient(
          top,
          transparent,
          rgba(26, 26, 26, 0.4)
        );
        background-image: -moz-linear-gradient(
          top,
          transparent,
          rgba(26, 26, 26, 0.4)
        );
        background-image: -o-linear-gradient(
          top,
          transparent,
          rgba(26, 26, 26, 0.4)
        );
        background-image: linear-gradient(
          rgba(255, 255, 255, 0),
          rgba(26, 26, 26, 0.4)
        );
        -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='#00FFFFFF',endColorstr='#661A1A1A',gradientType=0)";
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00FFFFFF',endColorstr='#661A1A1A',gradientType=0);
        .pic-num {
          display: inline-block;
          margin: 20px 5px 0 0;
          font-size: 26px;
          line-height: 1;
          font-family: 'Gulim';
          color: #fff;
        }
      }
    }
    .el-col {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .bigimg_bgall {
    width: 100%;
    height: 100%;
    z-index: 998;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  .bigimg_bg {
    outline: none;
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
  .lunbo {
    .carousel-img-style {
      width: 580px;
      height: 435px;
      text-align: center;
      margin-left: 80px;
      margin-right: 80px;
      position: relative;
    }
    .el-carousel__arrow {
      background-color: rgba(0, 0, 0, 0);
      .el-icon-arrow-left {
        font-size: 50px;
      }
      .el-icon-arrow-right {
        font-size: 50px;
      }
    }
    .el-carousel__arrow--left {
      position: absolute;
      left: 0;
      top: 50%;
    }
    .el-carousel__arrow--right {
      position: absolute;
      right: 16px;
      top: 50%;
    }
  }
  .lunbo_bg {
    .img_item {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
    .delete-icon {
      position: absolute;
      display: none;
      z-index: 999999999;
      width: 50px;
      height: 50px;
      line-height: 50px;
      right: 0;
      bottom: 60px;
      color: #fff;
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
    .img_beatch {
      position: relative;
      width: 240px;
      height: 50px;
      text-align: center;
      margin: 10px auto;
      background: #9ba3af;
      z-index: 99999;
      border-radius: 30px;
      .titicon1 {
        display: inline-block;
        position: relative;
        font-size: 24px;
        margin-right: 44px;
        line-height: 50px;
        color: #354052 !important;
        cursor: pointer;
        &:hover {
          .tit_name1 {
            display: inline-block;
          }
        }
      }
      .titicon2 {
        display: inline-block;
        position: relative;
        font-size: 24px;
        margin-right: 44px;
        line-height: 50px;
        color: #354052 !important;
        cursor: pointer;
        &:hover {
          .tit_name2 {
            display: inline-block;
          }
        }
      }
      .titicon3 {
        display: inline-block;
        position: relative;
        font-size: 24px;
        line-height: 50px;
        color: #354052 !important;
        cursor: pointer;
        &:hover {
          .tit_name3 {
            display: inline-block;
          }
        }
      }
      i {
        &:hover {
          color: #6f7e95 !important;
        }
      }
      .titname_bg {
        text-align: center;
      }
      a {
        &:hover {
          color: #6f7e95 !important;
        }
      }
      .el-icon-arrow-left {
        &:before {
          color: #6f7e95;
        }
      }
      .el-icon-arrow-right {
        &:before {
          color: #6f7e95;
        }
      }
    }
    .el-dialog {
      background: rgba(0, 0, 0, 0);
      box-shadow: none;
    }
    .el-dialog__body {
      padding: 0;
      border: none;
      background-color: rgba(0, 0, 0, 0);
      max-height: 900px !important;
    }
    .el-dialog__header {
      background-color: rgba(0, 0, 0, 0) !important;
    }
  }
  .img_name {
    position: absolute;
    bottom: 0;
    left: 80px;
    width: 580px;
    height: 56px;
    line-height: 56px;
    font-size: 14px;
    color: #354052;
    padding-left: 25px;
    text-align: left;
    background: rgba(235, 241, 245, 0.8);
    border-radius: 0 0 5px 5px;
  }
  .upload-demo {
    display: inline;
    .el-upload__tip {
      display: inline;
      margin-left: 10px;
    }
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
