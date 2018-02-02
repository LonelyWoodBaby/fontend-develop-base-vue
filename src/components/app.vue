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
    <div class="daily-list" ref="list">
      <template v-if="type === 'recommend'">
        <div v-for="list in recommendList" :key="list.title">
          <div class="daily-date">
            {{formartDay(list.date)}}
          </div>
          <Item v-for="item in list.stories" :data="item" :key="item.id" @click.native="handleClick(item.id)"></Item>
        </div>
      </template>
      <template v-if="type === 'daily'">
        <Item v-for="item in list" :key="item.id" :data="item" @click.native="handleClick(item.id)"></Item>
      </template>
    </div>
    <!--
    <dialy-artcile></dialy-artcile>
    -->
    <daily-artcile :id="artcileId"></daily-artcile>
  </div>
</template>
<script>
import $ from '../libs/util.js';
import Item from '../components/item.vue';
import dailyArtcile from '../components/daily-article.vue';

export default {
  components:{
    Item:Item,
    dailyArtcile:dailyArtcile
  },
  data() {
    return {
      themes:[],
      showThemes:false,
      type:'recommend',
      themeId:0,

      list:[],

      recommendList:[],
      dailyTime:$.getTodayTime(),
      isLoading:false,
      artcileId:0

    };
  },
  mounted() {
    this.getThemes();
    this.getRecommendList();
    const $list = this.$refs.list;
    $list.addEventListener('scroll',() =>{
      if(this.type === 'daily' || this.isLoading)return;
      if($list.scrollTop + document.body.clientHeight >= $list.scrollHeight){
        console.log('123123');
        this.dailyTime -= 86400000;
        this.getRecommendList();
      }
    });
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
      console.log(preDay);
      $.ajax.get('news/before/' + preDay).then(res =>{
        console.log('999000');
        this.recommendList.push(res);
        this.isLoading = false;
      });
    },
    formartDay (date){
      let month = date.substr(4,2);
      let day = date.substr(6,2);
      if(month.substr(0,1) === '0')month = month.substr(1,1);
      if(day.substr(0,1) === '0')day = day.substr(1,1);
      return `${month}月${day}日`;
    },
    handleClick(id){
      this.artcileId = id;
    }
  }
};
</script>
