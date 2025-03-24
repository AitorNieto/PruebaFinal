<template>
  <div class="videos-page">
    <div class="title-container">
      <img :src="fotoTitulo" alt="Título Videos" class="title-image" />
      <div class="title-overlay"></div>
    </div>

    <div class="videos-container">
      <button class="fancy-button back-button" @click="goBack">
        <i class="fas fa-arrow-left"></i>
        <span>Volver al Inicio</span>
        <div class="button-glow"></div>
      </button>

      <h1 class="main-title">Delirios y Barbaries</h1>
      
      <div class="seasons-nav">
        <button 
          v-for="season in seasons" 
          :key="season"
          :class="['season-button', { active: currentSeason === season }]"
          @click="selectSeason(season)"
        >
          <div class="season-content">
            <span class="season-number">{{ season }}</span>
            <span class="season-text">Temporada</span>
          </div>
          <div class="button-glow"></div>
        </button>
      </div>

      <div class="episodes-scroll">
        <button 
          class="nav-arrow left" 
          @click="navigateVideo('prev')"
          :disabled="currentVideoIndex === 0"
        >
          <i class="fas fa-chevron-left"></i>
        </button>

        <div class="episodes-wrapper" ref="episodesWrapper">
          <div 
            v-for="video in currentSeasonVideos" 
            :key="video.id" 
            class="video-card"
            :class="{ 'video-playing': video.playing }"
            @click="openVideo(video)"
          >
            <div class="video-container">
              <template v-if="!video.playing">
                <div class="video-thumbnail">
                  <img :src="video.thumbnail" :alt="video.title">
                  <div class="play-overlay">
                    <i class="fas fa-play"></i>
                  </div>
                </div>
              </template>
              <template v-else>
                <iframe
                  :src="`https://www.youtube.com/embed/${video.id}?autoplay=1`"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </template>
            </div>
            <div class="video-info">
              <h3>{{ video.title }}</h3>
            </div>
          </div>
        </div>

        <button 
          class="nav-arrow right" 
          @click="navigateVideo('next')"
          :disabled="currentVideoIndex === currentSeasonVideos.length - 1"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import fotoTitulo from '@/assets/fotoTitulo.jpeg';

const currentSeason = ref(1);
const currentVideoIndex = ref(0);
const episodesWrapper = ref(null);

// Array con tus videos por temporada
const videos = ref([
  {
    season: 1,
    episodes: [
      {
        id: '9I0KODX5IlY',
        title: 'Delirios y Barbaries - Episodio 1 - Especial Halloween',
        thumbnail: 'https://img.youtube.com/vi/9I0KODX5IlY/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'dOZrEidBUws',
        title: 'Delirios y Barbaries - Episodio 2',
        thumbnail: 'https://img.youtube.com/vi/dOZrEidBUws/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'gOohSnexR24',
        title: 'Delirios y Barbaries - Episodio 3',
        thumbnail: 'https://img.youtube.com/vi/gOohSnexR24/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'GHwhPstoLqw',
        title: 'Delirios y Barbaries - Episodio 4',
        thumbnail: 'https://img.youtube.com/vi/GHwhPstoLqw/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'cuJVkuXjoRU',
        title: 'Delirios y Barbaries - Episodio 5',
        thumbnail: 'https://img.youtube.com/vi/cuJVkuXjoRU/maxresdefault.jpg',
        playing: false
      },
      {
        id: '3ScBrNaBUoU',
        title: 'Delirios y Barbaries - Episodio 6',
        thumbnail: 'https://img.youtube.com/vi/3ScBrNaBUoU/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'SOuGOg32VG8',
        title: 'Delirios y Barbaries - Episodio 7',
        thumbnail: 'https://img.youtube.com/vi/SOuGOg32VG8/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'HhztYqizvHo',
        title: 'Delirios y Barbaries - Episodio 8',
        thumbnail: 'https://img.youtube.com/vi/HhztYqizvHo/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'klUEyjc6cQs',
        title: 'Delirios y Barbaries - Episodio 9',
        thumbnail: 'https://img.youtube.com/vi/klUEyjc6cQs/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'BE2rXCPhnU4',
        title: 'Delirios y Barbaries - Episodio 10',
        thumbnail: 'https://img.youtube.com/vi/BE2rXCPhnU4/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'vAKU0mjL89Q',
        title: 'Delirios y Barbaries - Episodio 11',
        thumbnail: 'https://img.youtube.com/vi/vAKU0mjL89Q/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'l2QkvjrFrDk',
        title: 'Delirios y Barbaries - Episodio 12',
        thumbnail: 'https://img.youtube.com/vi/l2QkvjrFrDk/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'z-7PkNjvrHo',
        title: 'Delirios y Barbaries - Episodio 13',
        thumbnail: 'https://img.youtube.com/vi/z-7PkNjvrHo/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'AF6niq5Wvuo',
        title: 'Delirios y Barbaries - Episodio 14',
        thumbnail: 'https://img.youtube.com/vi/AF6niq5Wvuo/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'iQGjiL-MsJk',
        title: 'Delirios y Barbaries - Episodio 15',
        thumbnail: 'https://img.youtube.com/vi/iQGjiL-MsJk/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'rem5QchMBmw',
        title: 'Delirios y Barbaries - Episodio 16',
        thumbnail: 'https://img.youtube.com/vi/rem5QchMBmw/maxresdefault.jpg',
        playing: false
      },
      {
        id: '__TlE7dunNA',
        title: 'Delirios y Barbaries - Episodio 17',
        thumbnail: 'https://img.youtube.com/vi/__TlE7dunNA/maxresdefault.jpg',
        playing: false
      },
      {
        id: '15iOXkEIYvk',
        title: 'Delirios y Barbaries - Episodio 18',
        thumbnail: 'https://img.youtube.com/vi/15iOXkEIYvk/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'OoZ-jvxonT4',
        title: 'Delirios y Barbaries - Episodio 19',
        thumbnail: 'https://img.youtube.com/vi/OoZ-jvxonT4/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'N0_bHxRB5kk',
        title: 'Delirios y Barbaries - Episodio 20',
        thumbnail: 'https://img.youtube.com/vi/N0_bHxRB5kk/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'lp1_XwA_S8g',
        title: 'Delirios y Barbaries - Episodio 21',
        thumbnail: 'https://img.youtube.com/vi/lp1_XwA_S8g/maxresdefault.jpg',
        playing: false
      }
    ]
  },
  {
    season: 2,
    episodes: [
      {
        id: 'CB_7jVxaXlU',
        title: 'Delirios y Barbaries T2 - Episodio 1',
        thumbnail: 'https://img.youtube.com/vi/CB_7jVxaXlU/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'JWsB6sa2KrY',
        title: 'Delirios y Barbaries T2 - Episodio 2',
        thumbnail: 'https://img.youtube.com/vi/JWsB6sa2KrY/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'iUTlHBrFW3g',
        title: 'Delirios y Barbaries T2 - Episodio 3',
        thumbnail: 'https://img.youtube.com/vi/iUTlHBrFW3g/hqdefault.jpg', // Changed to hqdefault
        playing: false
      },
      {
        id: 'M-Z0KfWYMOY',
        title: 'Delirios y Barbaries T2 - Episodio 4',
        thumbnail: 'https://img.youtube.com/vi/M-Z0KfWYMOY/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'Cg9jKL3wwyM',
        title: 'Delirios y Barbaries T2 - Episodio 5',
        thumbnail: 'https://img.youtube.com/vi/Cg9jKL3wwyM/hqdefault.jpg', // Changed to hqdefault
        playing: false
      },
      {
        id: 'NZb6FWP91X8',
        title: 'Delirios y Barbaries T2 - Episodio 6',
        thumbnail: 'https://img.youtube.com/vi/NZb6FWP91X8/hqdefault.jpg',
        playing: false
      },
      {
        id: 'WUqmVUzc5-Y',
        title: 'Delirios y Barbaries T2 - Episodio 7',
        thumbnail: 'https://img.youtube.com/vi/WUqmVUzc5-Y/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'tRgVdcUImKc',
        title: 'Delirios y Barbaries T2 - Episodio 8',
        thumbnail: 'https://img.youtube.com/vi/tRgVdcUImKc/maxresdefault.jpg',
        playing: false
      },
      {
        id: '_HK4lEjrykQ',
        title: 'Delirios y Barbaries T2 - Episodio 9',
        thumbnail: 'https://img.youtube.com/vi/_HK4lEjrykQ/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'XL7IN_VSj7M',
        title: 'Delirios y Barbaries T2 - Episodio 10',
        thumbnail: 'https://img.youtube.com/vi/XL7IN_VSj7M/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'f_fRgd5GKuY',
        title: 'Delirios y Barbaries T2 - Episodio 11',
        thumbnail: 'https://img.youtube.com/vi/f_fRgd5GKuY/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'peRRqAxLuwY',
        title: 'Delirios y Barbaries T2 - Episodio 12',
        thumbnail: 'https://img.youtube.com/vi/peRRqAxLuwY/maxresdefault.jpg',
        playing: false
      },
      {
        id: '3J6KXCvHZ8k',
        title: 'Delirios y Barbaries T2 - Episodio 13',
        thumbnail: 'https://img.youtube.com/vi/3J6KXCvHZ8k/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'f0oU0jsP5ew',
        title: 'Delirios y Barbaries T2 - Episodio 14',
        thumbnail: 'https://img.youtube.com/vi/f0oU0jsP5ew/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'xc4upWdxDlA',
        title: 'Delirios y Barbaries T2 - Episodio 15',
        thumbnail: 'https://img.youtube.com/vi/xc4upWdxDlA/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'NAGF8w1PrLg',
        title: 'Delirios y Barbaries T2 - Episodio 16',
        thumbnail: 'https://img.youtube.com/vi/NAGF8w1PrLg/hqdefault.jpg',
        playing: false
      },
      {
        id: 'xvbS_ijhC-8',
        title: 'Delirios y Barbaries T2 - Episodio 17',
        thumbnail: 'https://img.youtube.com/vi/xvbS_ijhC-8/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'aCNfYESVik8',
        title: 'Delirios y Barbaries T2 - Episodio 18',
        thumbnail: 'https://img.youtube.com/vi/aCNfYESVik8/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'NzWjlmy5tPk',
        title: 'Delirios y Barbaries T2 - Episodio 19',
        thumbnail: 'https://img.youtube.com/vi/NzWjlmy5tPk/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'sPKEOLcAwh0',
        title: 'Delirios y Barbaries T2 - Episodio 20',
        thumbnail: 'https://img.youtube.com/vi/sPKEOLcAwh0/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'LOQC8TH4tJI',
        title: 'Delirios y Barbaries T2 - Episodio 21',
        thumbnail: 'https://img.youtube.com/vi/LOQC8TH4tJI/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'DCzynDsLqSA',
        title: 'Delirios y Barbaries T2 - Episodio 22',
        thumbnail: 'https://img.youtube.com/vi/DCzynDsLqSA/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'p58wg6CQczA',
        title: 'Delirios y Barbaries T2 - Episodio 23',
        thumbnail: 'https://img.youtube.com/vi/p58wg6CQczA/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'HXN2Iq2vYrc',
        title: 'Delirios y Barbaries T2 - Episodio 24',
        thumbnail: 'https://img.youtube.com/vi/HXN2Iq2vYrc/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'Ff4zF7_Ne7U',
        title: 'Delirios y Barbaries T2 - Episodio 25',
        thumbnail: 'https://img.youtube.com/vi/Ff4zF7_Ne7U/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'Fit-LV-5JjE',
        title: 'Delirios y Barbaries T2 - Episodio 26',
        thumbnail: 'https://img.youtube.com/vi/Fit-LV-5JjE/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'HZKm05yQ5fM',
        title: 'Delirios y Barbaries T2 - Episodio 27',
        thumbnail: 'https://img.youtube.com/vi/HZKm05yQ5fM/maxresdefault.jpg',
        playing: false
      },
      {
        id: '2kZxy4Bd3Y0',
        title: 'Delirios y Barbaries T2 - Episodio 29',
        thumbnail: 'https://img.youtube.com/vi/2kZxy4Bd3Y0/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'sHQnvqfj84Y',
        title: 'Delirios y Barbaries T2 - Episodio 30',
        thumbnail: 'https://img.youtube.com/vi/sHQnvqfj84Y/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'D-tGHxZej98',
        title: 'Delirios y Barbaries T2 - Episodio 31',
        thumbnail: 'https://img.youtube.com/vi/D-tGHxZej98/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'Cn0aOP6JqqY',
        title: 'Delirios y Barbaries T2 - Episodio 32',
        thumbnail: 'https://img.youtube.com/vi/Cn0aOP6JqqY/maxresdefault.jpg',
        playing: false
      },
      {
        id: 've_sNrnsY1A',
        title: 'Delirios y Barbaries T2 - Episodio 33',
        thumbnail: 'https://img.youtube.com/vi/ve_sNrnsY1A/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'epzQ4TS_C6M',
        title: 'Delirios y Barbaries T2 - Episodio 34',
        thumbnail: 'https://img.youtube.com/vi/epzQ4TS_C6M/maxresdefault.jpg',
        playing: false
      },
      {
        id: 'zUWnrS3vcpU',
        title: 'Delirios y Barbaries T2 - Episodio 35',
        thumbnail: 'https://img.youtube.com/vi/zUWnrS3vcpU/hqdefault.jpg',
        playing: false
      },
      {
        id: 'OqKByt0EfE0',
        title: 'Delirios y Barbaries T2 - Episodio 36',
        thumbnail: 'https://img.youtube.com/vi/OqKByt0EfE0/hqdefault.jpg',
        playing: false
      },
      {
        id: 'OqKByt0EfE0',
        title: 'Delirios y Barbaries T2 - Episodio 37',
        thumbnail: 'https://img.youtube.com/vi/OqKByt0EfE0/hqdefault.jpg',
        playing: false
      }
    ]
  },
  {
    season: 3,
    episodes: [
      {
        id: '-sUj1iuaYGo',
        title: 'Delirios y Barbaries T3 - Episodio 1',
        thumbnail: 'https://img.youtube.com/vi/-sUj1iuaYGo/hqdefault.jpg',
        playing: false
      },
      {
        id: 'E6_F3EbkBfM',
        title: 'Delirios y Barbaries T3 - Episodio 2',
        thumbnail: 'https://img.youtube.com/vi/E6_F3EbkBfM/hqdefault.jpg',
        playing: false
      },
      {
        id: 'qkA95SJmwQg',
        title: 'Delirios y Barbaries T3 - Episodio 3',
        thumbnail: 'https://img.youtube.com/vi/qkA95SJmwQg/hqdefault.jpg',
        playing: false
      },
      {
        id: 'IXZvbjLWT24',
        title: 'Delirios y Barbaries T3 - Episodio 4',
        thumbnail: 'https://img.youtube.com/vi/IXZvbjLWT24/hqdefault.jpg',
        playing: false
      },
      {
        id: '736AgjljrFo',
        title: 'Delirios y Barbaries T3 - Episodio 5',
        thumbnail: 'https://img.youtube.com/vi/736AgjljrFo/hqdefault.jpg',
        playing: false
      },
      {
        id: 'cmy8o5x5QqE',
        title: 'Delirios y Barbaries T3 - Episodio 6',
        thumbnail: 'https://img.youtube.com/vi/cmy8o5x5QqE/hqdefault.jpg',
        playing: false
      },
      {
        id: '5UJidpIccxg',
        title: 'Delirios y Barbaries T3 - Episodio 7',
        thumbnail: 'https://img.youtube.com/vi/5UJidpIccxg/hqdefault.jpg',
        playing: false
      },
      {
        id: 'nzrqI7f6VXM',
        title: 'Delirios y Barbaries T3 - Episodio 8',
        thumbnail: 'https://img.youtube.com/vi/nzrqI7f6VXM/hqdefault.jpg',
        playing: false
      },
      {
        id: 'wOhGdmYiCRY',
        title: 'Delirios y Barbaries T3 - Episodio 9',
        thumbnail: 'https://img.youtube.com/vi/wOhGdmYiCRY/hqdefault.jpg',
        playing: false
      },
      {
        id: '4WivsLrbe8w',
        title: 'Delirios y Barbaries T3 - Episodio 10',
        thumbnail: 'https://img.youtube.com/vi/4WivsLrbe8w/hqdefault.jpg',
        playing: false
      },
      {
        id: 'ns1VrPod9pM',
        title: 'Delirios y Barbaries T3 - Episodio 11',
        thumbnail: 'https://img.youtube.com/vi/ns1VrPod9pM/hqdefault.jpg',
        playing: false
      },
      {
        id: 'OgjuVKHVlIE',
        title: 'Delirios y Barbaries T3 - Episodio 12',
        thumbnail: 'https://img.youtube.com/vi/OgjuVKHVlIE/hqdefault.jpg',
        playing: false
      },
      {
        id: 'k_gtP-yNZ8s',
        title: 'Delirios y Barbaries T3 - Episodio 13',
        thumbnail: 'https://img.youtube.com/vi/k_gtP-yNZ8s/hqdefault.jpg',
        playing: false
      },
      {
        id: '4TzsnjYjcsE',
        title: 'Delirios y Barbaries T3 - Episodio 14',
        thumbnail: 'https://img.youtube.com/vi/4TzsnjYjcsE/hqdefault.jpg',
        playing: false
      },
      {
        id: 'RBY2VcLvRl4',
        title: 'Delirios y Barbaries T3 - Episodio 15',
        thumbnail: 'https://img.youtube.com/vi/RBY2VcLvRl4/hqdefault.jpg',
        playing: false
      },
      {
        id: 'UTCguxgntjQ',
        title: 'Delirios y Barbaries T3 - Episodio 16',
        thumbnail: 'https://img.youtube.com/vi/UTCguxgntjQ/hqdefault.jpg',
        playing: false
      },
      {
        id: '54y913V7G0k',
        title: 'Delirios y Barbaries T3 - Episodio 17',
        thumbnail: 'https://img.youtube.com/vi/54y913V7G0k/hqdefault.jpg',
        playing: false
      },
      {
        id: 'WFlbzwdlMKQ',
        title: 'Delirios y Barbaries T3 - Episodio 18',
        thumbnail: 'https://img.youtube.com/vi/WFlbzwdlMKQ/hqdefault.jpg',
        playing: false
      },
      {
        id: 'ys870Rh-OpI',
        title: 'Delirios y Barbaries T3 - Episodio 19',
        thumbnail: 'https://img.youtube.com/vi/ys870Rh-OpI/hqdefault.jpg',
        playing: false
      },
      {
        id: 'om_Qh3Ki7eg',
        title: 'Delirios y Barbaries T3 - Episodio 20',
        thumbnail: 'https://img.youtube.com/vi/om_Qh3Ki7eg/hqdefault.jpg',
        playing: false
      },
      {
        id: '6Elpqe2R4k8',
        title: 'Delirios y Barbaries T3 - Episodio 21',
        thumbnail: 'https://img.youtube.com/vi/6Elpqe2R4k8/hqdefault.jpg',
        playing: false
      },
      {
        id: 'DUj3-fy076g',
        title: 'Delirios y Barbaries T3 - Episodio 22',
        thumbnail: 'https://img.youtube.com/vi/DUj3-fy076g/hqdefault.jpg',
        playing: false
      },
      {
        id: '-vm4MbcDIjo',
        title: 'Delirios y Barbaries T3 - Episodio 23',
        thumbnail: 'https://img.youtube.com/vi/-vm4MbcDIjo/hqdefault.jpg',
        playing: false
      },
      {
        id: '-Vcf2kh7w7A',
        title: 'Delirios y Barbaries T3 - Episodio 24',
        thumbnail: 'https://img.youtube.com/vi/-Vcf2kh7w7A/hqdefault.jpg',
        playing: false
      },
      {
        id: 'SWCkPnmq6NY',
        title: 'Delirios y Barbaries T3 - Episodio 25',
        thumbnail: 'https://img.youtube.com/vi/SWCkPnmq6NY/hqdefault.jpg',
        playing: false
      },
      {
        id: 'GxUADgLLfgI',
        title: 'Delirios y Barbaries T3 - Episodio 26',
        thumbnail: 'https://img.youtube.com/vi/GxUADgLLfgI/hqdefault.jpg',
        playing: false
      },
      {
        id: 'DXTmagPP4_E',
        title: 'Delirios y Barbaries T3 - Episodio 27',
        thumbnail: 'https://img.youtube.com/vi/DXTmagPP4_E/hqdefault.jpg',
        playing: false
      },
      {
        id: '_HvlnCWyrTE',
        title: 'Delirios y Barbaries T3 - Episodio 28',
        thumbnail: 'https://img.youtube.com/vi/_HvlnCWyrTE/hqdefault.jpg',
        playing: false
      },
      {
        id: 'BkNrn7z-rMM',
        title: 'Delirios y Barbaries T3 - Episodio 29',
        thumbnail: 'https://img.youtube.com/vi/BkNrn7z-rMM/hqdefault.jpg',
        playing: false
      },
      {
        id: 'QfYFlKTWeoU',
        title: 'Delirios y Barbaries T3 - Episodio 30',
        thumbnail: 'https://img.youtube.com/vi/QfYFlKTWeoU/hqdefault.jpg',
        playing: false
      },
      {
        id: '4bpWoT5QAd4',
        title: 'Delirios y Barbaries T3 - Episodio 31',
        thumbnail: 'https://img.youtube.com/vi/4bpWoT5QAd4/hqdefault.jpg',
        playing: false
      },
      {
        id: 'IPeX20JjS9c',
        title: 'Delirios y Barbaries T3 - Episodio 32',
        thumbnail: 'https://img.youtube.com/vi/IPeX20JjS9c/hqdefault.jpg',
        playing: false
      },
      {
        id: '4tOvqXRS0iY',
        title: 'Delirios y Barbaries T3 - Episodio 33',
        thumbnail: 'https://img.youtube.com/vi/4tOvqXRS0iY/hqdefault.jpg',
        playing: false
      },
      {
        id: 'fxAj-pAIV7o',
        title: 'Delirios y Barbaries T3 - Episodio 34',
        thumbnail: 'https://img.youtube.com/vi/fxAj-pAIV7o/hqdefault.jpg',
        playing: false
      },
      {
        id: 'dErHztutwj8',
        title: 'Delirios y Barbaries T3 - Episodio 35',
        thumbnail: 'https://img.youtube.com/vi/dErHztutwj8/hqdefault.jpg',
        playing: false
      },
      {
        id: 'CEsrJMLn_mE',
        title: 'Delirios y Barbaries T3 - Episodio 36',
        thumbnail: 'https://img.youtube.com/vi/CEsrJMLn_mE/hqdefault.jpg',
        playing: false
      },
      {
        id: 'fenV0sGRlCA',
        title: 'Delirios y Barbaries T3 - Episodio 37',
        thumbnail: 'https://img.youtube.com/vi/fenV0sGRlCA/hqdefault.jpg',
        playing: false
      },
      {
        id: 'Ma6Nh0Xlhzc',
        title: 'Delirios y Barbaries T3 - Episodio 38',
        thumbnail: 'https://img.youtube.com/vi/Ma6Nh0Xlhzc/hqdefault.jpg',
        playing: false
      },
      {
        id: 'lzfVSKwjUuM',
        title: 'Delirios y Barbaries T3 - Episodio 39',
        thumbnail: 'https://img.youtube.com/vi/lzfVSKwjUuM/hqdefault.jpg',
        playing: false
      },
      {
        id: 'X9Mia2GwG4Y',
        title: 'Delirios y Barbaries T3 - Episodio 40',
        thumbnail: 'https://img.youtube.com/vi/X9Mia2GwG4Y/hqdefault.jpg',
        playing: false
      },
      {
        id: 'CXxSAB-LPSU',
        title: 'Delirios y Barbaries T3 - Episodio 41',
        thumbnail: 'https://img.youtube.com/vi/CXxSAB-LPSU/hqdefault.jpg',
        playing: false
      },
      {
        id: 'o7RtdNV7_Ms',
        title: 'Delirios y Barbaries T3 - Episodio 42',
        thumbnail: 'https://img.youtube.com/vi/o7RtdNV7_Ms/hqdefault.jpg',
        playing: false
      },
      {
        id: 'TgC_u3F5CHM',
        title: 'Delirios y Barbaries T3 - Episodio 43',
        thumbnail: 'https://img.youtube.com/vi/TgC_u3F5CHM/hqdefault.jpg',
        playing: false
      },
      {
        id: 'XhwfIeGQ08Q',
        title: 'Delirios y Barbaries T3 - Episodio 44',
        thumbnail: 'https://img.youtube.com/vi/XhwfIeGQ08Q/hqdefault.jpg',
        playing: false
      },
      {
        id: '3ebn4DdFcJo',
        title: 'Delirios y Barbaries T3 - Episodio 45',
        thumbnail: 'https://img.youtube.com/vi/3ebn4DdFcJo/hqdefault.jpg',
        playing: false
      },
      {
        id: 'Hc_DfHbDxxI',
        title: 'Delirios y Barbaries T3 - Episodio 46',
        thumbnail: 'https://img.youtube.com/vi/Hc_DfHbDxxI/hqdefault.jpg',
        playing: false
      },
      {
        id: 'AjehdX9mxSw',
        title: 'Delirios y Barbaries T3 - Episodio 47',
        thumbnail: 'https://img.youtube.com/vi/AjehdX9mxSw/hqdefault.jpg',
        playing: false
      },
      {
        id: '_KekxGKYxfg',
        title: 'Delirios y Barbaries T3 - Episodio 48',
        thumbnail: 'https://img.youtube.com/vi/_KekxGKYxfg/hqdefault.jpg',
        playing: false
      },
      {
        id: '3jBeEz-oloI',
        title: 'Delirios y Barbaries T3 - Episodio 49',
        thumbnail: 'https://img.youtube.com/vi/3jBeEz-oloI/hqdefault.jpg',
        playing: false
      },
      {
        id: 'AJZQgVqhyic',
        title: 'Delirios y Barbaries T3 - Episodio 50',
        thumbnail: 'https://img.youtube.com/vi/AJZQgVqhyic/hqdefault.jpg',
        playing: false
      },
      {
        id: 'MEt-pPNNHI4',
        title: 'Delirios y Barbaries T3 - Episodio 51',
        thumbnail: 'https://img.youtube.com/vi/MEt-pPNNHI4/hqdefault.jpg',
        playing: false
      },
      {
        id: 'VrzSVHk8U4U',
        title: 'Delirios y Barbaries T3 - Episodio 52',
        thumbnail: 'https://img.youtube.com/vi/VrzSVHk8U4U/hqdefault.jpg',
        playing: false
      },
      {
        id: 'eYejtV9cPs8',
        title: 'Delirios y Barbaries T3 - Episodio 53',
        thumbnail: 'https://img.youtube.com/vi/eYejtV9cPs8/hqdefault.jpg',
        playing: false
      },
      {
        id: 'jdse4Bn5UHQ',
        title: 'Delirios y Barbaries T3 - Episodio 54',
        thumbnail: 'https://img.youtube.com/vi/jdse4Bn5UHQ/hqdefault.jpg',
        playing: false
      },
      {
        id: 'Y21HaKyI-L0',
        title: 'Delirios y Barbaries T3 - Episodio 55',
        thumbnail: 'https://img.youtube.com/vi/Y21HaKyI-L0/hqdefault.jpg',
        playing: false
      },
      {
        id: 'RKm4tQnJRjA',
        title: 'Delirios y Barbaries T3 - Episodio 56',
        thumbnail: 'https://img.youtube.com/vi/RKm4tQnJRjA/hqdefault.jpg',
        playing: false
      },
      {
        id: '6P9dgWKnv1c',
        title: 'Delirios y Barbaries T3 - Episodio 57',
        thumbnail: 'https://img.youtube.com/vi/6P9dgWKnv1c/hqdefault.jpg',
        playing: false
      },
      {
        id: 'ncggQhUfwd0',
        title: 'Delirios y Barbaries T3 - Episodio 58',
        thumbnail: 'https://img.youtube.com/vi/ncggQhUfwd0/hqdefault.jpg',
        playing: false
      },
      {
        id: 'ci4ecUBwMxQ',
        title: 'Delirios y Barbaries T3 - Episodio 59',
        thumbnail: 'https://img.youtube.com/vi/ci4ecUBwMxQ/hqdefault.jpg',
        playing: false
      },
      {
        id: 'aPv16ah7cmY',
        title: 'Delirios y Barbaries T3 - Episodio 60',
        thumbnail: 'https://img.youtube.com/vi/aPv16ah7cmY/hqdefault.jpg',
        playing: false
      }
    ]
  },
  {
    season: 4,
    episodes: [
      {
        id: 'vl33D6px9_U',
        title: 'Delirios y Barbaries T4 - Episodio 1',
        thumbnail: 'https://img.youtube.com/vi/vl33D6px9_U/hqdefault.jpg',
        playing: false
      },
      {
        id: 'Vc7iDX5nyt4',
        title: 'Delirios y Barbaries T4 - Episodio 2',
        thumbnail: 'https://img.youtube.com/vi/Vc7iDX5nyt4/hqdefault.jpg',
        playing: false
      },
      {
        id: 'pulr1MkHFuM',
        title: 'Delirios y Barbaries T4 - Episodio 3',
        thumbnail: 'https://img.youtube.com/vi/pulr1MkHFuM/hqdefault.jpg',
        playing: false
      },
      {
        id: 'cdT5X-qCxYc',
        title: 'Delirios y Barbaries T4 - Episodio 4',
        thumbnail: 'https://img.youtube.com/vi/cdT5X-qCxYc/hqdefault.jpg',
        playing: false
      },
      {
        id: '6AgdaVAnxsk',
        title: 'Delirios y Barbaries T4 - Episodio 5',
        thumbnail: 'https://img.youtube.com/vi/6AgdaVAnxsk/hqdefault.jpg',
        playing: false
      },
      {
        id: 'g7jLY3Z17uk',
        title: 'Delirios y Barbaries T4 - Episodio 6',
        thumbnail: 'https://img.youtube.com/vi/g7jLY3Z17uk/hqdefault.jpg',
        playing: false
      }
    ]
  }
])
  



// Definimos las temporadas disponibles
const seasons = [4 , 3 , 2 , 1 ];

// Computamos los videos de la temporada actual
const currentSeasonVideos = computed(() => {
  const seasonData = videos.value.find(s => s.season === currentSeason.value);
  return seasonData ? seasonData.episodes : [];
});

// Función para cambiar de temporada y reiniciar el índice
const selectSeason = (season) => {
  currentSeason.value = season;
  currentVideoIndex.value = 0;
};

const emit = defineEmits(['navigate']);
const goBack = () => {
  emit('navigate', 'home');
};

// Función para reproducir/pausar un video
const openVideo = (video) => {
  const seasonData = videos.value.find(s => s.season === currentSeason.value);
  if (seasonData) {
    seasonData.episodes.forEach(ep => {
      if (ep.id !== video.id) {
        ep.playing = false;
      }
    });
  }
  video.playing = !video.playing;
};

// Función para navegar entre videos
const navigateVideo = (direction) => {
  if (direction === 'next' && currentVideoIndex.value < currentSeasonVideos.value.length - 1) {
    currentVideoIndex.value++;
  } else if (direction === 'prev' && currentVideoIndex.value > 0) {
    currentVideoIndex.value--;
  }
  const videoCards = document.querySelectorAll('.video-card');
  videoCards[currentVideoIndex.value]?.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'center'
  });
};
</script>

<style scoped>
/* Aquí va todo el CSS que tenías: desde la configuración de la página, el header, botones, carrusel, etc. */
/* Por ejemplo: */
.videos-page {
  min-height: 100vh;
  background: 
    radial-gradient(circle at 10% 20%, rgba(76, 0, 76, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 90% 80%, rgba(76, 0, 0, 0.3) 0%, transparent 50%),
    linear-gradient(135deg, #000000 0%, #1a0000 100%);
  padding-top: 20px;
  position: relative;
  overflow: hidden;
  color: #ffffff;
}
/* Cabecera */
.title-container {
  height: 300px;
  position: relative;
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
}
.title-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.1);
  filter: brightness(0.7) contrast(1.2);
  transition: all 0.8s ease;
}
.title-overlay {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(20, 0, 20, 0.8));
}

/* Contenedor de videos */
.videos-container {
  width: 100%;
  max-width: none;
  margin: 20px 0 0;
  padding: 3rem;
  position: relative;
  z-index: 2;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.6),
    inset 0 0 30px rgba(76, 0, 76, 0.3);
}

/* Episodes scroll y flechas de navegación */
.episodes-scroll {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 2rem 0;
}

.nav-arrow {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  border: none;
  background: rgba(20, 0, 20, 0.95);
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(5px);
}

.nav-arrow.left {
  left: 0;
  border-radius: 0 30px 30px 0;
  box-shadow: 
    5px 0 15px rgba(0, 0, 0, 0.3),
    inset -2px 0 8px rgba(178, 75, 255, 0.3);
  padding-left: 10px;
}

.nav-arrow.right {
  right: 0;
  border-radius: 30px 0 0 30px;
  box-shadow: 
    -5px 0 15px rgba(0, 0, 0, 0.3),
    inset 2px 0 8px rgba(178, 75, 255, 0.3);
  padding-right: 10px;
}

.nav-arrow:hover:not(:disabled) {
  width: 80px;
  background: rgba(178, 75, 255, 0.3);
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.nav-arrow.left:hover:not(:disabled) {
  padding-right: 20px;
  box-shadow: 
    5px 0 25px rgba(178, 75, 255, 0.4),
    inset -2px 0 15px rgba(255, 255, 255, 0.2);
}

.nav-arrow.right:hover:not(:disabled) {
  padding-left: 20px;
  box-shadow: 
    -5px 0 25px rgba(178, 75, 255, 0.4),
    inset 2px 0 15px rgba(255, 255, 255, 0.2);
}

.nav-arrow:disabled {
  opacity: 0;
  cursor: default;
  pointer-events: none;
}

.nav-arrow i {
  transition: transform 0.3s ease;
}

.nav-arrow:hover i {
  transform: scale(1.2);
}

/* Episodes wrapper */
.episodes-wrapper {
  display: flex;
  gap: 2rem;
  padding: 2rem 6rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.episodes-wrapper::-webkit-scrollbar {
  display: none;
}

.episodes-wrapper {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  min-width: min-content;
  align-items: flex-start;
}

/* Título principal */
.main-title {
  font-size: 4.5rem;
  text-align: center;
  margin: 2rem 0;
  background: linear-gradient(45deg, #ffffff, #b24bff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 30px rgba(178, 75, 255, 0.3);
  font-weight: 800;
  letter-spacing: 2px;
  animation: titleGlow 3s infinite;
}
@keyframes titleGlow {
  0%, 100% { filter: brightness(1) drop-shadow(0 0 20px rgba(178, 75, 255, 0.3)); }
  50% { filter: brightness(1.2) drop-shadow(0 0 30px rgba(178, 75, 255, 0.5)); }
}

/* Botón "Volver al Inicio" */
.fancy-button {
  background: linear-gradient(45deg, #1a0f2e, #2d1f3d);
  color: #fff;
  padding: 1rem 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  font-size: 1.1rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3),
              inset 0 0 20px rgba(255, 255, 255, 0.05);
}
.fancy-button::after {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, #6e3b9b, #2d1f3d);
  z-index: -1;
  filter: blur(8px);
  opacity: 0;
  transition: opacity 0.4s ease;
}
.fancy-button:hover {
  transform: translateY(-3px);
  background: linear-gradient(45deg, #2d1f3d, #3d2952);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4),
              inset 0 0 30px rgba(255, 255, 255, 0.1);
}
.fancy-button:hover::after {
  opacity: 1;
}

/* Menú de temporadas */
.seasons-nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  box-shadow: inset 0 0 20px rgba(110, 59, 155, 0.1);
}
.season-button {
  background: rgba(20, 10, 30, 0.8);
  border: 1px solid rgba(110, 59, 155, 0.3);
  padding: 1.5rem 2.5rem;
  border-radius: 12px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  color: #ffffff;
  cursor: pointer;
}
.season-button:hover,
.season-button.active {
  background: linear-gradient(45deg, #2d1f3d, #3d2952);
  border-color: #6e3b9b;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3),
              0 0 30px rgba(110, 59, 155, 0.3);
  transform: translateY(-5px);
}
.season-number {
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

/* Tarjeta de video */
.video-card {
  width: 400px;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(178, 75, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}
.video-card:hover {
  transform: translateY(-10px);
  border-color: #b24bff;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5),
              0 0 50px rgba(178, 75, 255, 0.2);
}

/* Video container y contenido */
.video-container {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  background: #000;
}
.video-thumbnail, iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.3s ease;
}
.video-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.play-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  backdrop-filter: blur(2px);
}
.video-card:hover .play-overlay {
  opacity: 1;
}
.play-overlay i {
  font-size: 4rem;
  color: #ffffff;
  text-shadow: 0 0 20px rgba(178, 75, 255, 0.5);
  transform: scale(0.8);
  transition: all 0.3s ease;
}
.video-card:hover .play-overlay i {
  transform: scale(1);
}
.video-info {
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(40, 0, 40, 0.95));
}
.video-info h3 {
  color: #ffffff;
  font-size: 1.1rem;
  line-height: 1.4;
  text-align: center;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

/* Episodes wrapper */
.episodes-wrapper {
  display: flex;
  gap: 2rem;
  padding: 2rem 6rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.episodes-wrapper::-webkit-scrollbar {
  display: none;
}
.episodes-wrapper {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  min-width: min-content;
  align-items: flex-start;
}
</style>
