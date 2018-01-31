<template>
  <div class="daily">
    <div class="daily-menu">
      <div class="daily-menu-item" 
        :class="{on:type==='recommend'}"
        @click="handleToRecommend"
      >每日推荐</div>
      <div class="daily-menu-item" 
        :class="{on:type==='daily'}"
        @click="showThemes = !showThemes">主题日报</div>
      <ul v-show="showThemes">
        <li v-for="item in themes" :key="item.id">
          <a :class="{on:item.id === themeId && type === 'daily'}" @click="handleToTheme(item.id)">{{item.name}}</a>
        </li>
      </ul>
    </div>
    <div class="daily-list">
      <!--
      <Item></Item>
      -->
    </div>
    <!--
    <dialy-artcile></dialy-artcile>
    -->
  </div>
</template>
<script>
import $ from '../libs/util.js';
export default {
  data() {
    return {
      themes:[],
      showThemes:false,
      type:'recommend',
      themeId:0,

      list:[],

      recommendList:[],
      dailyTime:$.getTodayTime(),
      isLoading:false

    };
  },
  mounted() {
    this.getThemes();
    this.getRecommendList();
  },
  beforeDestroy() {},
  methods: {
    getThemes (){
      $.ajax.get('themes').then(res =>{
        this.themes = res.others;
      });
    },
    handleToTheme (id){
      this.type = 'daily';
      this.themeId = id;
      this.list = [];
      $.ajax.get('theme/' +id).then(res =>{
        this.list = res.stories.filter(item => item.type !== 1);
      });
    },
    handleToRecommend (){
      this.type = 'recommend';
      this.recommendList =[];
      this.dailyTime = $.getTodayTime();
      this.getRecommendList();
    },
    getRecommendList (){
      this.isLoading = true;
      const preDay = $.getPreDay(this.dailyTime + 86400000);
     
      $.ajax.get('news/before/' + preDay).then(res =>{
        console.log(res);
        this.recommendList.push(res);
        this.isLoading = false;
      });
    }
  }
};
</script>
