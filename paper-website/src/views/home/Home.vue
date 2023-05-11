<template>
  <div>
    <!-- 头部banner -->
    <banner />
    <!-- 关于我们 -->
    <about-us />
    <!-- 课程分类 -->
    <!-- <course-class /> -->
    <!-- 产品中心 -->
    <product-center/>
    <!-- 工程案例 -->
    <engineer-case/>
    <!-- 服务 -->
    <!-- <service /> -->
    <!-- 学员感言 -->
    <!-- <student-speak /> -->
    <!-- 导师团队 -->
    <!-- <teacher-team /> -->
    <!-- 新闻动态 -->
    <news />
    <!-- 行业知识 -->
    <Knowledges />
    <!-- 简介 -->
    <intro />
    <!-- 给我们留言 -->
    <!-- <message /> -->
  </div>
</template>

<script>
import banner from "@/views/home/components/Banner";
import AboutUs from "@/views/home/components/AboutUs";
import ProductCenter from "@/views/home/components/ProductCenter";
import EngineerCase from "@/views/home/components/EngineerCase.vue";
// import CourseClass from "@/views/home/components/CourseClass";
// import Service from "@/views/home/components/Service";
// import StudentSpeak from "@/views/home/components/StudentSpeak";
// import TeacherTeam from "@/views/home/components/TeacherTeam";
import News from "@/views/home/components/News";
import Knowledges from "@/views/home/components/Knowledges";
import Intro from "@/views/home/components/Intro";
import Message from "@/views/home/components/Message";
import scrollRevealMixin from "@/mixin/scrollRevealMixin.js";
export default {
  name: "Home",
  components: {
    banner,
    AboutUs,
    ProductCenter,
    EngineerCase,
    // CourseClass,
    // Service,
    // StudentSpeak,
    // TeacherTeam,
    News,
    Knowledges,
    Intro,
    Message,
  },
  mixins: [scrollRevealMixin],
  data() {
    return {};
  },
};
</script>

<style scoped></style>
