-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: localhost    Database: paper
-- ------------------------------------------------------
-- Server version	5.7.28-0ubuntu0.18.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) COLLATE utf8mb4_bin DEFAULT NULL,
  `info` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `regNum` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `property` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `engineerCases`
--

DROP TABLE IF EXISTS `engineerCases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `engineerCases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `url` mediumtext COLLATE utf8mb4_bin,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `content` text COLLATE utf8mb4_bin,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `engineerCases`
--

LOCK TABLES `engineerCases` WRITE;
/*!40000 ALTER TABLE `engineerCases` DISABLE KEYS */;
INSERT INTO `engineerCases` VALUES (13,1,'4.jpg','http://121.4.97.46:443/upload/postImg/35d9296f9b68439db10737bfb21bb4c8.jpg',NULL,NULL,NULL,'2020-01-15 11:44:40','2020-01-15 11:44:40',NULL),(14,1,'酒店用可定制餐巾纸10.jpg','http://121.4.97.46:443/upload/postImg/16d8a0991aec4618816a3ad43b7d3a0b.jpg',NULL,NULL,NULL,'2020-01-15 11:44:40','2020-01-15 11:44:40',NULL),(15,1,'酒店用80抽2层面巾纸10.jpg','http://121.4.97.46:443/upload/postImg/5a1c406e70be49e4b01ee6b934a671c8.jpg',NULL,NULL,NULL,'2020-01-15 11:44:40','2020-01-15 11:44:40',NULL),(16,1,'商用60抽2层面巾纸5.jpg','http://121.4.97.46:443/upload/postImg/7ae0b3e5035044f3be9a973ba0dcaa46.jpg',NULL,NULL,NULL,'2020-01-15 11:44:40','2020-01-15 11:44:40',NULL),(17,1,'纸业.png','http://121.4.97.46:443/upload/postImg/3bfec7d9c0cc4fb69a04c42e6fb8b44c.png',NULL,NULL,NULL,'2020-01-15 11:47:55','2020-01-15 11:47:55',NULL),(18,1,'banner原图2.jpg','http://121.4.97.46:443/upload/postImg/fb308dd3455a4b669a9799f0de39bf0b.jpg',NULL,NULL,NULL,'2020-01-15 15:28:54','2020-01-15 15:28:54',NULL),(19,1,'banner原图.jpg','http://121.4.97.46:443/upload/postImg/0545fc5d23c245f8b59251b8285dd213.jpg',NULL,NULL,NULL,'2020-01-15 15:28:54','2020-01-15 15:28:54',NULL);
/*!40000 ALTER TABLE `engineerCases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knowledge`
--

DROP TABLE IF EXISTS `knowledge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `knowledge` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `title` varchar(30) COLLATE utf8mb4_bin DEFAULT NULL,
  `content` mediumtext COLLATE utf8mb4_bin,
  `views` int(11) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knowledge`
--

LOCK TABLES `knowledge` WRITE;
/*!40000 ALTER TABLE `knowledge` DISABLE KEYS */;
INSERT INTO `knowledge` VALUES (1,1,'一吨原材料可以加工多少包抽纸？每包能挣多少？','抽纸加工用的原资料普通都是七千到八千左右的质料，按7000元一吨的质料，一吨的包装用度普通在300-400元，人工一吨用度大略150-200元，普通装备的耗电量八个小时五十元的电费！再加其余杂费，咱们都按比拟高的算，7000质料费+400包装费+200人工费+50电费+杂费250=7900元，即是加工一吨抽纸的本钱是7900元。做抽纸加工不什么消耗，平常咱们生涯顶用的抽纸基础上是每包0.2斤的，也就是说一吨原资料起码能够加工10000包抽纸，市道上一包抽纸最廉价的也是一元钱一包。即是一吨纸加工成制品买价能够到达一万元。撤除本钱7900元，也就是说咱们有2100元的利润，怎样算抽纸的利润都是很可不雅的。\n加工抽纸须要抽纸机跟软抽包装机或封盒机来实现，抽纸机能够实现原推测制品的主动加工进程，主动切纸，主动压纹，主动计数，不须要人工的参加，现在市场上应用最多的就是三排抽纸机，三排抽纸机合适收支行业的友人来抉择！',5,'2019-12-21 13:02:40','2020-10-20 22:07:06',NULL),(2,1,'湿巾的正确用法？','1、不可替代洗手\n \n用了湿纸巾，并差别等洗手。大夫夸大，湿纸巾再怎样重复擦手也无奈去除皮肤名义的细菌，用番笕洗手，再加下活动的水，才是最清洁的。\n \n2、不可重复使用\n \n美国的一项研讨也标明，湿纸巾重复应用时，非但不能肃清细菌，反而会将一些存活的细菌转移到未被传染的名义。因而要留神，最好每擦一个新名义换一张纸巾，更不要用它擦拭眼睛等敏感部位。\n \n3、购置时抉择竹纤维湿巾\n \n湿纸巾含有大批液体，十分轻易繁殖细菌，这对它的出产进程请求绝对严厉，在正规出产厂家，工人们天天都要对车间里的氛围停止臭氧消毒，以确保湿巾在出产中不被氛围中的细菌传染，购置时最好只管抉择产物无增加化学剂、自然抑菌的竹纤维本质湿巾。\n \n其次，只管选用每片都有独破小包装的湿纸巾，如选用抽取式湿纸巾，每次用完后应密封，尽快用完，以防止其有效身分挥发。\n \n4、最好抉择无香型\n \n湿纸巾的基础身分是不香味的，咱们平常闻到的茶香、薰衣草香味，是经由过程增加香剂而发生的，抉择无香型的湿纸巾，象征着能打仗更少的增加剂，对宝宝而言，更主要。',0,'2019-12-21 13:03:08','2019-12-21 13:03:08',NULL),(3,1,'无芯的卷纸用什么盒子装','无芯的卷纸能够用纸篮子、抽纸盒、草纸盒来装，详细如下：\n \n1、用“纸篮子“装。普通纸张规格为115*150mm，可依据纸张的规格抉择恰当尺寸的盒子。\n \n2、用“抽纸盒”装，长方形的抽纸盒能够装下无芯的卷纸。\n \n3、用草纸盒来装。装置方式是在纸盒反面打上一圈玻璃胶，粘贴在瓷砖上，上面用货色垫一下，24小时后掏出垫物，能够应用。只管不要打眼，由于良多水管就在纸盒的地位，很轻易攻破水管。\n \n4、放在塑料袋里，挂在挂钩上，纸的一头显露塑料袋口，用的时间拉一下就行了。\n1, use \"paper basket\" loaded. Ordinary paper specifications of 115 * 150mm, according to the paper specifications can be selected the appropriate size of the box.\n2, with \"smoking box\" installed, rectangular carton can be loaded without the core of the roll paper.\n3, use a papyrus box to install. The device method is to put a circle of glass glue on the reverse side of the carton and paste it on the tile. The top is cushioned with the goods. After 24 hours, the cushion is taken out and can be applied. Just don\'t hit the eye, because many water pipes are in the box\'s position, it is easy to break the water pipe.\nPut it in a plastic bag and hang it on a hook. One end of the paper reveals the mouth of the plastic bag.',1,'2019-12-21 13:03:32','2019-12-21 16:03:22',NULL),(4,1,'湿巾的种类','现在市面上有很多牌子的湿巾，湿巾主要是用来清洁擦拭的。合格的湿巾产品是经过消毒处理的，这样才不会把细菌带到身上。湿巾的种类也是有很多的，消费者可以根据具体的需要选择合适的湿巾。\n    湿巾按照原料可以分为两种，湿强纸和无纺布。大部分的湿巾都是无纺布。\n    湿巾按照工艺的不同，可以分为：交叉和顺向铺网，交叉铺网的拉力更为均匀，不易分裂。\n    湿巾按照使用人群的不同，可以分为：大人湿巾和婴儿湿巾，婴儿湿巾对于湿巾的要求比较高，不能添加酒精、香精等材料。\n    需要提醒大家的是，湿巾的原液不能全部是药水，要与纯水相结合，这样才安全，并且能够达到清洁的作用。现在市面上有很多种牌子的湿巾，在选购湿巾的时候一定要选择包装完整的，这样的湿巾才有可能做过消毒处理，包装不完整的湿巾一般都是没有做过消毒处理，这样的湿巾对人体是没有任何好处的。\n \n \nThere are many brands of wipes on the market now. Wet towels are mainly used for cleaning and wiping. Qualified wet towel products are sterilized so that they do not bring bacteria to the body. There are also many types of wipes, and consumers can choose suitable wipes according to specific needs.\nWet towels can be divided into two types according to the raw materials, wet strong paper and non-woven cloth. Most wipes are non-woven.\nWet towels can be divided into different processes: cross and straight paving, cross paving more uniform tension, not easy to split.\nWet towels can be divided into: adult wipes and baby wipes, baby wipes are relatively high requirements for wipes, can not add alcohol, essence and other materials.\nIt needs to be reminded that the original liquid of the wet towel can not be all potions. It must be combined with pure water so that it is safe and can achieve a clean effect. There are many kinds of wet towels on the market. When choosing a wet towel, you must choose to complete the packaging. Such a wet towel may be sterilized. The incomplete wet towel is generally not sterilized. Such a wet towel is no good to the human body.',4,'2019-12-21 13:03:57','2019-12-21 16:03:36',NULL),(5,1,'湿纸巾上的防尘盖不要扔','首先筹备一个用完了的湿纸巾包装袋，湿纸巾上的防尘盖给取上去，取上去的防尘盖将它用热熔胶粘在家里的插座下面，粘好后咱们来看下它的两个小妙用吧！\n\n1.把取上去的湿纸巾防尘盖粘在插座下面，能够很好的维护插座外面的插套跟插孔，能够起到防尘、防水跟防触电感化，特殊是家里有小孩子的，能够防止小孩子游玩插座产生不测。\n\n2.咱们给手机充电的时间就能够把手机放在防尘盖下面了，为了防止手机滑落上去，能够在盖子下面粘上一点双面胶来牢固手机，如许咱们给手机充电的时间就不必寻东西放手机了。\n\n1. Stick the dust cover of the wet paper towel under the socket, which can well maintain the socket sleeve and socket, and can play a role in dust prevention, water resistance and electric shock resistance. Especially for children at home, it can prevent children from playing in the socket.\n\n\n2. When we charge the mobile phone, we can put it under the dustproof cover. In order to prevent the mobile phone from slipping off, we can stick some double-sided adhesive tape under the cover to secure the mobile phone',5,'2019-12-21 13:04:33','2020-10-20 22:07:57',NULL);
/*!40000 ALTER TABLE `knowledge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `title` varchar(30) COLLATE utf8mb4_bin DEFAULT NULL,
  `content` mediumtext COLLATE utf8mb4_bin,
  `views` int(11) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (1,1,'卫生纸用完扔马桶还是扔纸篓？','卫生间装修是咱们家里很主要的一个地区，这里咱们天天用到的次数良多，以是装修必定要居心。卫生间的应用始终有一个成绩困扰着人们，就是用过的卫生纸，咱们应当扔到马桶仍是纸篓里，良多人都不是很留神这个成绩。\n    实在咱们偶然间在大众茅厕的时间，都市发明这里的马桶旁边都市摆放这一个渣滓纸篓，面都市有一个提醒，就是制止在马桶外面丢纸巾，实在咱们个别都市把顺手用过的纸巾扔马桶里，然而咱们外出的时间都市带着的是手帕纸，这种一包包的手帕纸实在水溶性是十分差的，假如咱们硬是把它丢进了马桶外面，很轻易就会形成马桶梗塞，如许就会显得很费事。\n\n    抽纸，这种纸巾的水溶性会相对比较好，丢到马桶里面很容易就会被分解掉，我们也不用担心会产生马桶堵塞，所以在家里用抽纸可以不用丢在纸篓里面，直接扔马桶就可以了，很方便。 ',1,'2019-12-21 12:59:31','2019-12-23 16:44:03',NULL),(2,1,'日益受欢迎的擦手纸','  我们知道擦手纸是生活用纸中一次性卫生用品，也称抹手纸，它有卷筒状，也有折叠式二折，但目前更多的是三折抽取式，主要供酒店、宾馆、写字楼、机场、歌剧院、会所等公共场所洗手间擦手之用，当然也适用于家庭；配合产品方便使用还有专门的擦手纸纸架，由于擦手纸使用无须等待，一张纸即可擦干一双手，用后手上不留毛尘，柔软又舒适，已逐渐代替洗手间内的电烘手机，从十余年前的五星级宾馆到现在的城市咖啡厅，深受广大宾客的欢迎。目前，擦手纸产品一逐渐在工农牧业生产环境中使用，如工厂车间、种植养殖场所等。\n \n     擦手纸的众多称谓：卷装擦手纸、单张摺叠式擦手纸、厕所用擦手纸、厨房用擦手纸、V折擦手纸、2折擦手纸、C折擦手纸等，专业品牌如纵横擦手纸。\n ',4,'2019-12-21 13:00:00','2019-12-21 16:03:16',NULL),(3,1,'婴儿湿巾材质详情','   婴儿湿巾就是专门给宝宝用的湿巾，和成人的湿巾相比，婴儿湿巾的要求相对更高，因为宝宝的皮肤是非常娇嫩的，很容易过敏。婴儿湿巾又分为普通湿巾和手口专用湿巾，普通婴儿湿巾通常用来擦宝宝的小屁屁，手口湿巾用来擦宝宝的嘴和手的。\n \n    婴儿湿巾根据功能分不同类型，可分为消毒湿巾与手口湿巾湿巾，带有消毒、抗菌功能，不同品牌的湿巾价位不一样，婴儿使用舒适度也不一样，可根据实际使用情况购买。\n \n    湿巾的成本、价格高低主要取决于无纺布。婴儿湿巾一般采用的是水刺无纺布，分直铺和交叉铺网两种。直铺的抗拉性较差，较薄较透容易变形、起毛，引发宝宝不适。交叉铺网也叫纵横网织，具抗拉性基本不变形，布质厚实不容易渗透。',5,'2019-12-21 13:00:22','2020-10-20 22:07:48',NULL),(4,1,'什么样的卫生纸才算是合格','有很多人问我厂家，什么样的卫生纸才算是合格呢？我厂家为你解答，一起看看吧！\n \n    卫生纸是一种常见的生活用纸，但是什么样的卫生纸是优质的卫生纸呢？优质的卫生纸首先要有完好的包装。卫生纸生产的全过程是在高温下完成的，如果包装不及时、不完整或者储藏不当，都会使纸张受潮、污染。所以，在挑选时，必须选择那些包装完好而且生产日期较近的产品。有些摸上去较厚，这种纸的等级较低。\n 在购买卫生纸的时候要非常注意，卫生纸的包装，除此之外，还要注意卫生纸的白度和柔软度。如果卫生纸的白度过于惨白的话，不要购买，这样的卫生纸可能是加油荧光增白剂，长期使用会对我们的身体造成伤害。在选择卫生纸的时候要多方面的考虑问题，不要觉得卫生纸很白就觉得卫生纸的质量很好。卫生纸的选择是非常重要的一个问题，但是我国对卫生纸的认识并没有普及，这个还需要有关部门加大对卫生纸的监督和管理。',5,'2019-12-21 13:00:37','2019-12-21 16:03:09',NULL),(5,1,'盒抽纸的广告作用',' 盒抽纸的广告作用是怎样的呢？  盒抽纸随着作为一种具有商业性质的促销品和广告礼品，越来越多的用于酒店，餐饮企业、企业、娱乐休闲会所、汽车行业、银行等。\n \n    一、价格低廉成本低，盒抽纸单品价格非常低。对于企业的成本投入控制非常好。\n \n   二、目标客户广泛，盒抽纸没有局限性，男女老少都可以使用，所以广告盒抽纸的市场是非常好做的，并且有很大的广告宣传效果。\n \n    三、受众率高，使用盒抽纸没有什么限制，每个人每天要动几次盒抽纸。',11,'2019-12-21 13:00:52','2020-12-12 19:03:38',NULL);
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_types`
--

DROP TABLE IF EXISTS `product_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `desc` mediumtext COLLATE utf8mb4_bin,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_types`
--

LOCK TABLES `product_types` WRITE;
/*!40000 ALTER TABLE `product_types` DISABLE KEYS */;
INSERT INTO `product_types` VALUES (1,'卫生纸（卷纸）','卫生纸（卷纸）-是集卫生纸生产,批发,加工为一体的知名保定卫生纸厂家,主营各种品牌卫生纸,卫生卷纸,卫生纸等生活用纸价格优惠,种类丰富,厂家直销,欢迎选购','2019-12-21 01:42:57','2019-12-21 15:44:29',NULL),(2,'手帕纸','手帕纸-满城县百利达纸品有限公司专业生产销售手帕纸,是一家著名的河北保定手帕纸厂家,手帕纸种类齐全,提供手帕纸批发订做加工业务,百利达手帕纸价格实惠,厂家直销,欢迎选购','2019-12-21 09:00:19','2020-01-09 14:44:54',NULL),(3,'抽纸','本公司专业生产卷纸，餐巾纸，手帕纸，擦手纸，抽纸，定制抽纸，定制盒抽，不含荧光剂，环保卫生，有韧性，不掉屑，欢迎来电咨询，我们将竭诚为您服务，祝您生活愉快，一切顺利。','2019-12-26 15:01:29','2020-01-10 18:10:57',NULL),(4,'擦手纸','擦手纸，以湿强木浆纸为主要原料加工而成。擦手纸是生活用纸中一次性卫生用品，也称抹手纸，它有卷筒状，也有折叠式二折，但更多的是三折抽取式。主要供酒店、宾馆、写字楼、机场、歌剧院、会所等公共场所洗手间擦手之用，当然也适用于家庭；','2019-12-26 15:13:05','2019-12-26 15:13:05',NULL);
/*!40000 ALTER TABLE `product_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productTypeId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `url` mediumtext COLLATE utf8mb4_bin,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `content` text COLLATE utf8mb4_bin,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (20,3,1,'商用50抽2层面巾纸2.jpg','http://121.4.97.46:443/upload/postImg/be793272f3364aeeb71510ac01b3eb06.jpg',NULL,NULL,NULL,'2020-01-09 14:41:04','2020-01-09 14:41:04',NULL),(21,3,1,'商用50抽2层面巾纸4.jpg','http://121.4.97.46:443/upload/postImg/8f1d98d170a3495fa2f1175ce89db1fe.jpg',NULL,NULL,NULL,'2020-01-09 14:41:22','2020-01-09 14:41:22',NULL),(22,3,1,'商用50抽2层面巾纸3.jpg','http://121.4.97.46:443/upload/postImg/ddf0d51ab9c34abca40e6988c7c2d3f9.jpg',NULL,NULL,NULL,'2020-01-09 14:41:36','2020-01-09 14:41:36',NULL),(23,3,1,'商用50抽2层面巾纸5.jpg','http://121.4.97.46:443/upload/postImg/aec8778758ab4af39afbf38608a9c1ef.jpg',NULL,NULL,NULL,'2020-01-09 14:41:56','2020-01-09 14:41:56',NULL),(24,3,1,'商用60抽2层面巾纸2.jpg','http://121.4.97.46:443/upload/postImg/0b15df5b1acd4dfe8e540348f843666d.jpg',NULL,NULL,NULL,'2020-01-09 16:01:49','2020-01-09 16:01:49',NULL),(25,3,1,'商用60抽2层面巾纸4.jpg','http://121.4.97.46:443/upload/postImg/fb89941e0bce4ac88d70e36375954747.jpg',NULL,NULL,NULL,'2020-01-09 16:02:18','2020-01-09 16:02:18',NULL),(26,3,1,'酒店可用定制餐巾纸Logo展示4.jpg','http://121.4.97.46:443/upload/postImg/7d41cf472ab04ce1b01dbbdb98f802b1.jpg',NULL,NULL,NULL,'2020-01-09 16:03:07','2020-01-09 16:03:07',NULL),(27,3,1,'酒店用可定制餐巾纸8.jpg','http://121.4.97.46:443/upload/postImg/2ea1719f558346c196b8f232d3e6dd28.jpg',NULL,NULL,NULL,'2020-01-09 16:03:43','2020-01-09 16:03:43',NULL),(28,3,1,'6.jpg','http://121.4.97.46:443/upload/postImg/4410851f8b25432abb2726c5c2d1c5f4.jpg',NULL,NULL,NULL,'2020-01-09 16:04:19','2020-01-09 16:04:19',NULL),(29,3,1,'5.jpg','http://121.4.97.46:443/upload/postImg/831481f53d9847b49410cf6d02a82141.jpg',NULL,NULL,NULL,'2020-01-09 16:04:49','2020-01-09 16:04:49',NULL),(30,3,1,'7.jpg','http://121.4.97.46:443/upload/postImg/33320646e36c41388237da77318a0a87.jpg',NULL,NULL,NULL,'2020-01-09 16:05:10','2020-01-09 16:05:10',NULL),(34,4,1,'1.jpg','http://121.4.97.46:443/upload/postImg/80ca0e34b1d2468794c522ba36f7077e.jpg',NULL,NULL,NULL,'2020-01-09 16:30:09','2020-01-09 16:30:09',NULL),(35,4,1,'2.jpg','http://121.4.97.46:443/upload/postImg/d3fd1a6e2f6f4534bf07beb6f6185a8a.jpg',NULL,NULL,NULL,'2020-01-09 16:30:43','2020-01-09 16:30:43',NULL),(36,4,1,'6.jpg','http://121.4.97.46:443/upload/postImg/7df6bd1307d746238addc37e43354d20.jpg',NULL,NULL,NULL,'2020-01-09 16:30:43','2020-01-09 16:30:43',NULL),(37,4,1,'3.jpg','http://121.4.97.46:443/upload/postImg/742e6b646c234b658f64a7c5cd711c39.jpg',NULL,NULL,NULL,'2020-01-09 16:30:43','2020-01-09 16:30:43',NULL),(38,4,1,'4.jpg','http://121.4.97.46:443/upload/postImg/036fc05c7b594dc7935f5f42675f0635.jpg',NULL,NULL,NULL,'2020-01-09 16:30:43','2020-01-09 16:30:43',NULL),(39,2,1,'10.jpg','http://121.4.97.46:443/upload/postImg/f2e8ffe60ce84d279332763d300d60be.jpg',NULL,NULL,NULL,'2020-01-09 16:32:00','2020-01-09 16:32:00',NULL),(40,2,1,'11.jpg','http://121.4.97.46:443/upload/postImg/2b381c5fa1e443c1b67a8b06c527ad8a.jpg',NULL,NULL,NULL,'2020-01-09 16:32:00','2020-01-09 16:32:00',NULL),(41,2,1,'8.jpg','http://121.4.97.46:443/upload/postImg/7934a6501bb04fb5bc961a09d014d7a2.jpg',NULL,NULL,NULL,'2020-01-09 16:32:00','2020-01-09 16:32:00',NULL),(42,2,1,'9.jpg','http://121.4.97.46:443/upload/postImg/0c71157b35dd48a48ef3a143f6ed1b2d.jpg',NULL,NULL,NULL,'2020-01-09 16:32:00','2020-01-09 16:32:00',NULL),(43,2,1,'13.jpg','http://121.4.97.46:443/upload/postImg/0727127de0884df28c9a5d79e051da1d.jpg',NULL,NULL,NULL,'2020-01-09 16:32:00','2020-01-09 16:32:00',NULL),(44,3,1,'ba307dd4a662454a80084c4711f54145.jpg','http://121.4.97.46:443/upload/postImg/7212060483ae450991445ce304469653.jpg',NULL,NULL,NULL,'2020-01-10 18:16:13','2020-01-10 18:16:13',NULL),(45,3,1,'ecf367419415429cad513c82bbecdce6.jpg','http://121.4.97.46:443/upload/postImg/ada69fd55ea844cb900454df106c9a73.jpg',NULL,NULL,NULL,'2020-01-10 18:16:13','2020-01-10 18:16:13',NULL),(46,3,1,'酒店用80抽2层面巾纸1.jpg','http://121.4.97.46:443/upload/postImg/ac86eb26fec5449698e9070544ee02c2.jpg',NULL,NULL,NULL,'2020-01-15 10:20:21','2020-01-15 10:20:21',NULL),(47,3,1,'酒店用80抽2层面巾纸6.jpg','http://121.4.97.46:443/upload/postImg/4ea526218d6f40f389aeaf373d4fddf9.jpg',NULL,NULL,NULL,'2020-01-15 10:20:21','2020-01-15 10:20:21',NULL),(48,3,1,'酒店用80抽2层面巾纸3.jpg','http://121.4.97.46:443/upload/postImg/e2e8777d458b4bb086363361b519ee53.jpg',NULL,NULL,NULL,'2020-01-15 10:20:21','2020-01-15 10:20:21',NULL),(49,3,1,'酒店用80抽2层面巾纸4.jpg','http://121.4.97.46:443/upload/postImg/f149d2b3d86d42d489ef7489b20acbc0.jpg',NULL,NULL,NULL,'2020-01-15 10:20:21','2020-01-15 10:20:21',NULL),(50,3,1,'酒店用80抽2层面巾纸5.jpg','http://121.4.97.46:443/upload/postImg/598923cad2f24c64a1eccb2c02855cf3.jpg',NULL,NULL,NULL,'2020-01-15 10:20:21','2020-01-15 10:20:21',NULL),(51,3,1,'酒店用80抽2层面巾纸8.jpg','http://121.4.97.46:443/upload/postImg/af6790818e124035aa9ac4880b97fe3b.jpg',NULL,NULL,NULL,'2020-01-15 10:20:43','2020-01-15 10:20:43',NULL),(52,3,1,'酒店用80抽2层面巾纸9.jpg','http://121.4.97.46:443/upload/postImg/72e30e581bcb4c2491c4c93e8e0f5115.jpg',NULL,NULL,NULL,'2020-01-15 10:20:43','2020-01-15 10:20:43',NULL),(53,3,1,'酒店用80抽2层面巾纸10.jpg','http://121.4.97.46:443/upload/postImg/6cc03ce621f64987abbed2ea025c4e97.jpg',NULL,NULL,NULL,'2020-01-15 10:20:43','2020-01-15 10:20:43',NULL),(54,3,1,'酒店用80抽2层面巾纸11.jpg','http://121.4.97.46:443/upload/postImg/85289aa27bb04e5d8bdda1ac0788be62.jpg',NULL,NULL,NULL,'2020-01-15 10:20:43','2020-01-15 10:20:43',NULL),(56,1,1,'酒店用80抽2层面巾纸8.jpg','http://121.4.97.46:443/upload/postImg/af6790818e124035aa9ac4880b97fe3b.jpg',NULL,NULL,NULL,'2020-01-15 16:24:07','2020-04-13 20:46:00','    好的纸巾纸因为原材料是纯木浆，或含木浆量高，因而纤维较长，耐性强，扩张力大，有弹力，不简单被扯断。\n    之前在现场做了一个试验，手里拿着一款维达的原木浆纸，用力拉扯，只见纸张有被拉扯的褶皱呈现，但并未开裂。而不好的纸张因为含木浆纯度低，纤维短且细，很简单就脆断，稍微用力即会呈现开裂现象。\n\n'),(63,1,1,'柔滋初卷纸.jpg','http://121.4.97.46:443/upload/postImg/06435a48ef82404699e5bd7bc219494d.jpg',NULL,NULL,NULL,'2020-03-06 14:38:04','2020-03-06 14:38:04',NULL),(64,1,1,'酒店用80抽2层面巾纸8.jpg','http://121.4.97.46:443/upload/postImg/af6790818e124035aa9ac4880b97fe3b.jpg',NULL,NULL,NULL,'2020-03-06 14:38:04','2020-04-13 20:53:49','        或许许多的人会有这样的疑问，卷纸还有什么差异呢?其实，不同的卷纸，河南鑫欣纸业卷纸批发卷筒纸卫生标准是不一样的。\n\n        一些卷筒纸，卫生卷纸生产企业是在卫生部分备过案的，其生产出来的产品，要有相关部分出具的检测陈述，对产品的细菌总数、金黄色葡萄球菌以及大肠杆菌等细菌指标进行过检测，检测合格后才干获得卫生批准文号，即在产品包装上，才会印有“卫消字号”的卫生许可证号，这些产品属于消毒产品中的卫生用品类;而别的一些不通过卫生部分备案的卷筒纸，其没有通过卫生指标的检测，属于非卫生用品，这些产品不能接触口腔黏膜、鼻腔黏膜等，在包装上，它要有“厕所用纸”的标识。~~~~'),(65,1,1,'酒店用80抽2层面巾纸8.jpg','http://121.4.97.46:443/upload/postImg/af6790818e124035aa9ac4880b97fe3b.jpg',NULL,NULL,NULL,'2020-03-06 14:38:04','2020-04-13 20:45:07','纸巾并非越白越好。有些出产企业为了进步纸质的洁白度，会过量添加荧光增白剂去除固执污质，让抽纸巾从外包装上看有亮白洁新的感觉。但事实恰恰相反，国家对纸巾的白度有明确规定，纸巾规范A等品产品白度规定为85.0%～90.0%。假如纸质的白度超过了90.0%，是不符合规范要求的。使用不合规范的纸巾纸，轻者会呈现皮肤瘙痒，严重会换癌症，甚至是逝世。因而建议顾客不要购买太白，或是泛青、泛蓝光的纸。\n\n'),(66,4,1,'柔滋初定制纸巾.jpg','http://121.4.97.46:443/upload/postImg/9e1bc281ed174a1ab6da68a3e1434f13.jpg',NULL,NULL,NULL,'2020-03-06 14:38:52','2020-04-11 21:13:51','盒抽纸,保定盒抽纸厂家(图片)，百利达纸品有限公司，公司从原料、生产、加工于一体，专注产品质量，专业定做，量大从优，盒抽纸,保定盒抽纸厂家，百利达纸品精品的选择。'),(67,3,1,'柔滋初抽纸.jpg','http://121.4.97.46:443/upload/postImg/cd05d5cc34814c3688a53a85eb4fd37e.jpg',NULL,NULL,NULL,'2020-03-06 14:39:47','2020-03-06 14:39:47',NULL),(68,3,1,'2113556684.jpg','http://121.4.97.46:443/upload/postImg/ea77c05cfa384cc4ad74ba5363f71b9b.jpg',NULL,NULL,NULL,'2020-04-11 20:58:32','2020-04-11 20:58:32','抽纸具体如下用途：\n\n1、辨识 ，系在手袋或旅行包上，便于识别，又可兼晾干用。\n\n2、给小孩子擦口水，垫背，防汗。\n\n3、手绢通常用于清理人的脸部、手部等，有时候也用于浴后擦身等。\n\n4、眼罩 ，疲劳时以手帕蒙眼遮挡强光，可随时随地提高小憩质量。\n\n5、挡护 ，可随时在抄需要时，置于膝上或领下，保护正装不受污浊。\n\n6、辨识 ，系在手袋或旅行包上，便于识别，又可兼晾干用。\n\n7、手绢通常用于清理人的脸部、手部等，有时候也用于浴后擦身等。');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_infos`
--

DROP TABLE IF EXISTS `user_infos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_infos` (
  `id` int(11) NOT NULL,
  `role` int(11) DEFAULT NULL,
  `username` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `nickName` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_infos`
--

LOCK TABLES `user_infos` WRITE;
/*!40000 ALTER TABLE `user_infos` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_infos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `username` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin','bcdccbf38addded97c20859ba15e8ff3');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-17  1:00:19
