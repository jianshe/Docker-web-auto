<template>
  <div class="iframe">
    <span v-if="isWeixin" v-html='content'></span>
    <iframe v-else :srcdoc="content" style="width:100%;height:500px"></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: `<h2>Summary</h2> 
<div class="inset-column"> 
 <dl class="lcds-description-list--grid"> 
  <dt class="cell-1_1">
   Company Announcement Date:
  </dt> 
  <dd class="cell-2_1">
   <time datetime="2019-06-06T15:45:00Z">June 06, 2019</time> 
  </dd> 
  <dt class="cell-1_2">
   FDA Publish Date:
  </dt> 
  <dd class="cell-2_2">
   <time datetime="2019-07-11T04:00:00Z">July 11, 2019</time> 
  </dd> 
  <dt class="cell-1_3">
   Product Type:
  </dt> 
  <dd class="cell-2_3">
   Food &amp; Beverages 
   <br>Gravy/Sauces 
  </dd> 
  <dt class="cell-1_4">
   Reason for Announcement:
  </dt> 
  <dd class="cell-2_4"> 
   <div class="field field--name-field-recall-reason-description field--type-string field--label-above"> 
    <div class="field--label">
     Recall Reason Description
    </div> 
    <div class="field--item">
     Undeclared Fish
    </div> 
   </div> 
  </dd> 
  <dt class="cell-1_5">
   Company Name:
  </dt> 
  <dd class="cell-2_5">
   Baumer Foods, Inc.
  </dd> 
  <dt class="cell-1_6">
   Brand Name:
  </dt> 
  <dd class="cell-2_6"> 
   <div class="field field--name-field-brand-name field--type-entity-reference field--label-inline"> 
    <div class="field--label">
     Brand Name(s)
    </div> 
    <div class="field--items"> 
     <div class="field--item">
      PICS 
     </div> 
    </div> 
   </div> 
  </dd> 
  <dt class="cell-1_7">
   Product Description:
  </dt> 
  <dd class="cell-2_7"> 
   <div class="field field--name-field-product-description field--type-string field--label-above"> 
    <div class="field--label">
     Product Description
    </div> 
    <div class="field--items"> 
     <div class="field--item">
      Soy Sauce
     </div> 
    </div> 
   </div> 
  </dd> 
 </dl> 
</div> 
<hr> 
<h2 id="recall-announcement">Company Announcement</h2> 
<p>Baumer Foods, Inc. of Metairie, LA<strong> </strong>is recalling 10 oz PICS Soy Sauce<strong>,</strong> because it may contain undeclared <strong>fish</strong>. People who have an allergy or severe sensitivity to fish run the risk of serious or life-threatening allergic reaction if they consume these products.</p> 
<p>PICS Soy Sauce was distributed only in Upstate New York, Connecticut, Pennsylvania, Vermont, Massachusetts, and New Hampshire through Price Chopper Supermarkets, Market Bistro and Market 32’s.</p> 
<p>The affected PICS Soy Sauce is sold in a 10 oz glass bottle, label UPC# 0-41735-00794, it is dark colored and labeled with PICS Soy Sauce. <strong>The bottle coding</strong> <strong>of the recall</strong> <strong>is Best By 03/28/2021.</strong> No other PICS Soy Sauce products are affected by this recall.</p> 
<p>There have been no related illnesses confirmed as of June 6, 2019.</p> 
<p>The recall was initiated after it was discovered that product was labeled as Soy Sauce without the known fish allergen but the bottle actually contained Worcestershire sauce. Worcestershire Sauce has the known allergen fish. Subsequent investigation indicates the problem was caused by a temporary oversight during the packaging processes.</p> 
<p>Consumers should destroy the product and contact Baumer Foods, Inc. for a replacement. Consumers with questions may contact the Baumer Foods, Inc. at (504)482-5761, ext 1473.</p> 
<div class="inset-column"> 
 <hr> 
 <h2>Company Contact Information</h2> 
 <div class="row"> 
  <div class="col-xs-12 col-md-6"> 
   <dl> 
    <dt>
     Consumers:
    </dt> 
    <dd>
     Baumer Foods, Inc. Michelle McDaniel 
    </dd> 
    <dd>
     <span class="fa fa-phone" aria-hidden="true"></span> (504)482-5761, ext 1473
    </dd> 
   </dl> 
  </div> 
  <div class="col-xs-12 col-md-6"> 
   <dl> 
   </dl> 
  </div> 
 </div> 
</div>`
    }
  },
  methods: {
    isWeixin() {
      let ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style>
</style>