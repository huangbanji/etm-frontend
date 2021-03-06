/**
 * Created by 23hp on 2017/6/30.
 */

import {get, post, request_get_erp} from "./etmNetwork.js"
import {RESOURCE_ROOT,ETM_ROOT,setUrl,SITE_CODE} from "./serverUrl.js"

/**
 * 用户登录接口
 * @param username 用户名(需要验证)
 * @param password 密码(md5 64位 加密密码)
 * @returns {Object}
 */
// export function login(username, password) {
//   let params={
//     "username": username,
//     "password": password,
//     "pbCol": "userid,customer_grade,customer_type_id,platform_name,site_code"
//   };
//   let url = setUrl("etm_api","/manage/user/etmUser.do?m=login")
//   return post(url, params);
// }

export function login(username, password) {
  let url = setUrl("user_api",`/lola_cms_Interface/user/loginIn.do?userName=${username}&password=${password}&site_login=${SITE_CODE}`)
  return get(url);
}

/**
 * 手机短信验证
 */
export function sendVerify(phone) {
  let url = setUrl("user_api",`/lola_cms_Interface/user/sendSms.do?phoneNumber=${phone}`)
  return get(url);
}

/**
 * 用户退出接口
 */
// export function logout(token) {
//   let url = setUrl("user_api",`/lola_cms_Interface/user/loginOut.do?token=${token}`)
//   return get(url);
// }

export function logout() {
  let url = setUrl("user_api",`/lola_cms_Interface/user/loginOut.do`)
  console.log("url",url);
  return get(url, {'Content-Type': 'application/json', 'ticket': __getTicket()});
}


/**
 * 修改密码接口
 * @param userid 用户表主键对应userid
 * @param password 修改后的密码
 * @returns {Object}
 */
// export function updatePassword(userid, password) {
//   let params={
//     "pb_UrlId":"182",
//     "userid": userid,
//     "password": password
//   };
//   let url = setUrl("etm_api","/manage/xt/man.do?m=update&data=one")
//   return post(url, params, {'Content-Type': 'application/json', 'ticket': __getTicket()});
// }
export function updatePassword(oldPassWord, newPassWord) {
  let url = setUrl("user_api",`/lola_cms_Interface/user/updatePassWord.do?oldPassWord=${oldPassWord}&newPassWord=${newPassWord}`)
  return get(url,{'Content-Type': 'application/json', 'ticket': __getTicket()});
}

/**
 * 获取用户信息接口
 * @param userid 用户userid
 * @returns {Object}
 */

// export function getUserInfo(userid) {
//   let params={
//     "pb_UrlId": "182",
//     "userid": userid
//   };
//   let url = setUrl("etm_api","/manage/xt/man.do?m=get&data=page")
//   return post(url, params, {'Content-Type': 'application/json', 'ticket': __getTicket()});
// }
export function getUserInfo(userid) {
  let url = setUrl("user_api",`/lola_cms_Interface/user/findByUserid.do?userid=${userid}&sitecode=${SITE_CODE}`)
  return get(url,{'Content-Type': 'application/json', 'ticket': __getTicket()});
}

/**
 * 导航栏列表接口
 * @param site_code 用户对应的平台标识
 * @returns {Object}
 */
export function getNavbar(site_code) {
  let params={
    "site_code": site_code
  };
  let url = setUrl("etm_api",`/lola_cms_Interface/manage/treeNode.do?site_code=${!site_code ? SITE_CODE : site_code}`)
  // let url = setUrl("etm_api","/manage/xt/navigations.do?m=get")
  return post(url, params);
}

/**
 * 购特车列表接口
 * @param site_code 用户对应的平台标识
 * @param user_id 用户信息(登录名)
 * @param page 页码
 * @returns {Object}
 */
export function getCart(site_code, user_id) {
  let params={
    // "pb_UrlId": "176",
    "site_code": site_code,
    "user_id": user_id,
    // "page_size": 999
  };
  let url = setUrl("etm_api","/lola_cms_Interface/etm/userCarts.do")
  // let url = setUrl("etm_api","/manage/xt/man.do?m=get&data=page")
  return post(url, params, {'Content-Type': 'application/json', 'ticket': __getTicket()});
}

/**
 * 添加商品到购物车接口
 * @param site_code 用户对应的平台标识
 * @param user_id 用户信息(登录名)
 * @param sku_id sku_id
 * @param warehouse 仓库
 * @param goods_name 商品名称
 * @param goods_thumb 商品小图
 * @param face_price 面价
 * @param price 单价
 * @param count 数量
 * @param grades 等级
 * @param unit 单位
 * @returns {Object}
 */
export function addCart(param) {
  let params={
    // "pb_UrlId": "176",
    "site_code": param.site_code,
    "user_id": param.user_id,
    "sku_id": param.sku_id,
    "warehouse": param.warehouse,
    "count": param.count,
  };
  let url = setUrl("etm_api","/lola_cms_Interface/etm/addCarts.do")
  // let url = setUrl("etm_api","/manage/xt/man.do?m=add&data=one")
  return post(url, params, {'Content-Type': 'application/json', 'ticket': __getTicket()});
}

/**
 * 删除购物车商品接口
 * @param id 购物车商品的主键id
 * @returns {Object}
 */
export function delCart(ids) {
  var id = [];
  if (ids){
    ids = ids.toString();
    id = ids.split(",");
  }
  let params = {
    // "pb_UrlId":"176",
    "id": id
  };
  let url = setUrl("etm_api","/lola_cms_Interface/etm/delCarts.do")
  // let url = setUrl("etm_api","/manage/xt/man.do?m=del&data=rows")
  return post(url, params, {'Content-Type': 'application/json', 'ticket': __getTicket()});
}

/**
 * 修改购物车商品接口
 * @param id 购物车商品的主键id
 * @param count 数量
 * @returns {Object}
 */
export function updateCart(id, count) {
  let params = {
    // "pb_UrlId":"176",
    "id": id,
    "count": count
  };
  let url = setUrl("etm_api","/lola_cms_Interface/etm/updateCarts.do")
  // let url = setUrl("etm_api","/manage/xt/man.do?m=update&data=one")
  return post(url, params, {'Content-Type': 'application/json', 'ticket': __getTicket()});
}

/**
 * 修改收货地址接口
 * @param id 收货地址表主键id
 * @param isflag 是否设为默认地址(值默认为0否,1是)
 * @param country 国家
 * @param province 省
 * @param city 市
 * @param district 区
 * @param address 地址
 * @param zipcode 邮政编码
 * @param consignee 联系人
 * @param telephone 座机号
 * @param phone_number 手机号码
 * @returns {Object}
 */
export function updateAddress(param) {
  let params = {
    // "pb_UrlId":"177",
    "id":param.id,
    "isflag":param.isflag,
    "country":param.country,
    "province":param.province,
    "city":param.city,
    "district":param.district,
    "address":param.address,
    "zipcode":param.zipcode,
    "consignee":param.consignee,
    "telephone":param.telephone,
    "phone_number":param.phone_number
  };
  let url = setUrl("etm_api","/lola_cms_Interface/manage/addresses.do?m=update")
  // let url = setUrl("etm_api","/manage/xt/man.do?m=update&data=one")
  return post(url, params, {'Content-Type': 'application/json', 'ticket': __getTicket()});
}

/**
 * 企业入驻接口
 * @param name 客户名称
 * @param company 公司名称
 * @param contact 联系人
 * @param sex 性别
 * @param mobile 手机号
 * @param wechat 微信号
 * @param province 省
 * @param city 市
 * @param district 区
 * @param street 街道
 * @param address 详细地址
 * @param referrer 推荐人(写手机号)
 * @param site_code 平台标识(写英文)
 * @param platform_name 平台类型名称(写中文)
 * @returns {Object}
 */
export function register(param) {
  let params = {
    "name": param.name,
    "company": param.company,
    "contact": param.contact,
    "sex": param.sex,
    "mobile": param.mobile,
    "wechat": param.wechat,
    "province": param.province,
    "city": param.city,
    "district": param.district,
    "street": param.street,
    "address": param.address,
    "referrer": param.referrer,
    "site_code": param.site_code,
    "platform_name": param.platform_name
  };
  // let url = setUrl("etm_api","/manage/user/etmUser.do?m=register")
  let url = setUrl("user_api",`/lola_cms_Interface/user/register.do`)
  return post(url, params);
}

//获取注册列表
export function getRegister() {
  let url = setUrl("user_api",`/lola_cms_Interface/user/topRecords.do?site_code=${SITE_CODE}&returnRecord=16`)
  return get(url);
}


//获取分类数据
// export function getCategory(site_code) {
//   let url = setUrl("rc",`/api/v1/product_categories?site_code=${!site_code ? SITE_CODE : site_code}`)
//   return get(url);
// }

export function getCategory(site_code) {
  let url = setUrl("rc_cms",`/lola_cms_Interface/rc_manage/category.do`);
  return get(url);
}


//获取游客大公共标签
export function getDefaultHall() {
  let param = {};
  param.api_path = '/api/v1/product_halls';
  param.site_code = __getSiteCode();
  return get(`/rc`, param);
}

//获取用户大公共标签
export function getUserHall(site_code, customer_classify_id, targetPlatform) {
  let param = {
    api_path: `/api/v1/customer_type_tag_relationships`,
    'filter[site_code]': site_code,
    'filter[customer_type_id]': customer_classify_id,
    'filter[plate]': targetPlatform
  };
  return get(`/b2b`, param);
}

/**
 * 关键字搜索接口
 * @param site_code 平台标识
 * @param search 搜索关键字。只匹配产品名称、产品编号
 * @param page 页码
 * @param is_validate 非会员0, 会员为1,白金为2, 不传值为面价
 * @returns {Object}
 */
export function getProductSearch(site_code, search, page, is_validate) {
  var params = "";
  if (!site_code || site_code == null) {
    site_code = SITE_CODE
  }
  if (is_validate != null) {
    params = params + "is_validate=" + is_validate + "&"
  }
  if (search != null) {
    params = params + "search=" + search + "&"
  }
  if (page != null) {
    params = params + "page=" + page
  }
  let url=setUrl("rc",`/api/v1/products?product_hall_id=20,40&site_code=${site_code}&${params}`);
  return get(url);
}

/**
 * 获取产品列表
 * @param page 页码，默认 1
 * @param search 搜索关键字。只匹配产品名称、产品编号
 * @param site_code 平台标识
 * @param warehouse 仓库
 * @param product_hall_id 客戶专属标签商品馆 可批量搜索 如(20,40)
 * @param is_validate 非会员0, 会员为1,白金为2, 不传值为面价
 * @param product_category_id 分类 ID
 * @param texture 材质
 * @param color_id 颜色
 * @param spec 产品规格
 * @param shape_id 形状
 * @param water_absrp_rate_id 吸水率
 * @param brand 品牌
 * @param level 搜索等级，如 "A", "B", "C", "D"
 * @param price 价格范围，如 100-200
 * @param special_supply 是否专供， 专供传true，false都为非专供（51etm不作筛选，也不返回）
 * @returns {Object}
 */


/**
 * 获取产品列表
 * @param page 页码，默认 1
 * @param matgroup 产品分类1-4级
 * @param doctype 平台标识
 * @param isLogin 是否登录  0未登录，1非会员登录，2登录会员，3白金
 * @param clttype 客户归档
 * @param texture 材质
 * @param colour 颜色
 * @param special 规格
 * @param shape 形状
 * @param water 吸水率
 * @param technology 表面工艺
 * @param material 品牌
 * @param cv6 等级
 * @param stcode  仓库
 * @param activitylabel 活动标签
 * @param isfor 是否专供
 * @param maxPrice 最大价格
 * @param minPrice 最小价格
 * @returns {Object}
 */


export function getProductList(getParam) {
  let params = {
    doctype: SITE_CODE,
    page_size: 20,
    page: getParam.page,
    isLogin: getParam.userLevel
}

 if(getParam.userLevel != 0 ){
   params.clttype = getParam.site_code
 }
  // if (SITE_CODE == "51etm") {
  //   params.product_hall_id = (getParam.product_hall_id  ? getParam.product_hall_id : '20,40');
  //
  // }

  if (getParam.category_id) {
    params.matgroup = getParam.category_id
  }

  if (getParam.search) {
    params.search = getParam.search;
  }

  if (getParam.is_validate) {
    params.is_validate = getParam.is_validate;
  }

  if (getParam.material_id) {
    params.texture = getParam.material_id;
  }
  if (getParam.warehouse) {
    params.stcode =getParam.warehouse;
  }

  if (getParam.color_id) {
    params.colour = getParam.color_id;
  }
  if (getParam.spec) {
    params.special = getParam.spec;
  }
  if (getParam.page) {
    params.page = getParam.page;
  }
  if (getParam.shape_id) {
    params.shape = getParam.shape_id;
  }
  if (getParam.water_absrp_rate_id) {
    params.water = getParam.water_absrp_rate_id;
  }
  if (getParam.level) {
    params.cv6 = getParam.level;
  }
  // if (getParam.level) {
  //   params.cv6 = getParam.level;
  // }
  if (getParam.minPrice) {
    params.minPrice = getParam.minPrice;
  }
  if (getParam.maxPrice) {
    params.maxPrice = getParam.maxPrice;
  }
  if (getParam.surface_craft_id) {
    params.technology = getParam.surface_craft_id;
  }
  if (getParam.brand) {
    params.material = getParam.brand
  }
  if (getParam.special_supply) {
    params.isfor = getParam.special_supply;
  }
  console.log(JSON.stringify(params))
  let url = setUrl("rc_cms",`/lola_cms_Interface/rc_manage/selectBy_Condition_and_TimatGeneral.do`);
  return post(url, params );

}

/**
 * 搜索条件产品matcode得出产品列表
 */
export function getMatcode(getParams) {
  let params ={
    doctype: SITE_CODE,
    matcode: getParams.matcode,
    isLogin: getParams.isLogin,
    page_size: 20,
    page: getParams.page,
  };
  if (getParams.isLogin != 0 ) {
    params.clttype = getParams.clttype;
    params.stcode =getParams.warehouse;

  }

  console.log("params",JSON.stringify(params))
  let url = setUrl("rc_cms",`/lola_cms_Interface/rc_manage/selectByMatcode.do`);
  return post(url, params );

}


/**
 * 获取产品详情接口
 * @param site_code 用户对应的平台标识
 * @param is_validate 非会员0, 会员为1,白金为2, 不传值为面价
 * @param sku_id sku_id
 * @param product_hall_id 客戶专属标签商品馆 可批量搜索 如(20,40)
 * @param single 是否返回单条数据。默认 0
 * @returns {Object}
 */
// export function getProductDetail(site_code, sku_id, is_validate, product_hall_id, single) {
//   var params = "site_code=" + site_code;
//   params = params + "&is_validate=" + (is_validate != null ? is_validate : 0);
//   params = params + (!product_hall_id ? "" : ("&product_hall_id=" + product_hall_id));
//   params = params + (!single ? "" : ("&single=" + single));
//   let url=`${RESOURCE_ROOT}/api/v1/products/${sku_id}?${params}`;
//   console.log("url",url);
//   return get(url);
//
// }
export function getProductDetail(getParams) {
  // var params = "site_code=" + site_code;
  // params = params + "&is_validate=" + (is_validate != null ? is_validate : 0);
  // params = params + (!product_hall_id ? "" : ("&product_hall_id=" + product_hall_id));
  // params = params + (!single ? "" : ("&single=" + single));
  //let url=`${RESOURCE_ROOT}/lola_cms_Interface/rc_manage/selectTmatSkusTagsBySuk.do`;
  let url = setUrl("rc_cms",`/lola_cms_Interface/rc_manage/selectTmatSkusTagsBySuk.do`);
  let params = {
    sku_id: getParams.sku_id,
    docType: SITE_CODE
  }
  if(getParams.userLevel != 0){
    params.clttype = getParams.siteCode;
  }
  console.log("产品详情params",JSON.stringify(params))
  return post(url,params);
}




/**
 * 获取商品收藏列表接口
 * @param site_code 用户对应的平台标识
 * @param user_id 用户信息(登录名)
 * @returns {Object}
 */
export function getProductFavoriteList(site_code, user_id) {
  let params = {
    // "pb_UrlId": "171",
    "site_code": site_code,
    "user_id": user_id
  };
  let url = setUrl("etm_api","/lola_cms_Interface/collects/select_collects.do")
  console.log("获取收藏列表",params,url)
  // let url = setUrl("etm_api","/manage/xt/man.do?m=get&data=page")
  return post(url, params, {'Content-Type': 'application/json', 'ticket': __getTicket()});
}

/**
 * 收藏商品 接口
 * @param site_code 用户对应的平台标识
 * @param user_id 用户信息(登录名)
 * @param sku_id sku_id
 * @returns {Object}
 */
export function addProductFavorite(site_code, user_id, sku_id) {
  let params = {
    // "pb_UrlId": "171",
    "site_code": site_code,
    "user_id": user_id,
    "docType": SITE_CODE,
    "sku_id": sku_id
  };
  let url = setUrl("etm_api","/lola_cms_Interface/collects/add_collects.do")
  console.log("产品收藏",params,url)
  // let url = setUrl("etm_api","/manage/xt/man.do?m=add&data=one")
  return post(url, params, {'Content-Type': 'application/json', 'ticket': __getTicket()});
}

/**
 * 修改收藏 接口
 * @param id 收藏表主键id
 * @param site_code 用户对应的平台标识
 * @param user_id 用户信息(登录名)
 * @param sku_id sku_id
 * @returns {Object}
 */
export function updateProductFavorite(id, site_code, user_id, sku_id) {
  let params = {
    "pb_UrlId":"171",
    "id": id,
    "site_code": site_code,
    "user_id": user_id,
    "sku_id": sku_id
  };
  let url = setUrl("etm_api","/manage/xt/man.do?m=update&data=one")
  return post(url, params, {'Content-Type': 'application/json', 'ticket': __getTicket()});
}

/**
 * 删除收藏 接口
 * @param id 收藏表主键id
 * @returns {Object}
 */
export function delProductFavorite(id) {
  let params = {
    // "pb_UrlId":"171",
    "id": id
  };
  let url = setUrl("etm_api","/lola_cms_Interface/collects/delete_collects.do")
  // let url = setUrl("etm_api","/manage/xt/man.do?m=del&data=rows")
  return post(url, params, {'Content-Type': 'application/json', 'ticket': __getTicket()});
}

/**
 * 创建订单 接口
 * @param user_id 用户信息对应的id
 * @param address_id 地址id
 * @param is_pallet 是否打托(是 or 否)
 * @param is_delay_shipment 是否延迟发货(是 or 否)
 * @param delay_shipment_time 时间 yyyy-MM-dd
 * @param memo 备注
 * @param logistics 物流方式(自提 or 代办物流)
 * @param pick_date 自提时间(物流方式为自提时)
 * @param order_goods: [{
      sku_id sku_id,
      warehouse 仓库,
      count 数量,
      goods_code 产品编号(product_no),
      goods_name 商品名称,
      goods_thumb 小图,
      face_price 面价,
      price 实时价格,
      unit 单价,
      grades 等级,
      special 规格
 }] list(产品)
 * @param order_goods 用户信息(登录名)
 * @returns {Object}
 */
export function createOrder(param) {
  let params = {
    "site_code":param.site_code,
    "user_id": param.user_id,
    "address_id": param.address_id,
    "is_pallet": param.is_pallet,
    "is_delay_shipment": param.is_delay_shipment,
    "delay_shipment_time": param.delay_shipment_time,
    "memo": param.memo,
    "logistics": param.logistics,
    "pick_date": param.pick_date,
    "order_goods": param.order_goods
  }
  // let url = setUrl("etm_api","/manage/xt/order.do?m=add");
  let url = setUrl("etm_api","/lola_cms_Interface/order/add.do");
  return post(url, params, {'Content-Type': 'application/json', 'ticket': __getTicket()});
}

/**
 * 获取下级地区列表  仅用于用户中心
 * @param areaId  父级ID
 */
export function getNextAreaList(areaId) {
  let param = {
    api_path: `/api/v2/china_region`,
    code: areaId
  };
  return get(`/user`, param);
}

/**
 * 获取市级地区列表  仅用于用户中心
 * @param provinceId  省级ID
 */
export function getCityList(provinceId) {
  let param = {
    api_path: `/api/v1/cities`,
    'filter[province_id]': provinceId
  };
  return get(`/b2b`, param);
}

/**
 * 获取县级地区列表  仅用于用户中心
 * @param cityId  市级ID
 */
export function getDistrictList(cityId) {
  let param = {
    api_path: `/api/v1/districts`,
    'filter[city_id]': cityId
  };
  return get(`/b2b`, param);
}

/**
 * 获取地址列表
 * @param site_code 用户对应的平台标识
 * @param user_id 用户信息(登录名)
 * @param page 页码，默认 1
 * @returns {Object}
 */
export function getUserAddressList(site_code, user_id, page) {
  let params = {
    // "pb_UrlId":"177",
    "site_code": site_code,
    "user_id": user_id,
    "page": !page ? 1 : page
  };

  let url = setUrl("etm_api","/lola_cms_Interface/manage/addresses.do?m=get")
  // let url = setUrl("etm_api","/manage/xt/man.do?m=get&data=page")
  return post(url, params, {'Content-Type': 'application/json', 'ticket': __getTicket()});
}

/**
 * 新增地址接口
 * @param user_id 用户信息(登录名)
 * @param site_code 用户对应的平台标识
 * @param country 国家
 * @param province 省
 * @param city 市
 * @param district 区
 * @param address 地址
 * @param zipcode 邮政编码
 * @param consignee 联系人
 * @param telephone 座机号
 * @param phone_number 手机号码
 * @param isflag 是否设为默认地址(值默认为0,)
 * @returns {Object}
 */
export function addAddress(user_id, site_code, country, province, city, district, address, zipcode, consignee, telephone, phone_number, isflag) {
  let params = {
    // "pb_UrlId":"177",
    "user_id": user_id,
    "site_code": site_code,
    "country": country,
    "province": province,
    "city": city,
    "district": district,
    "address": address,
    "zipcode": zipcode,
    "consignee": consignee,
    "telephone": telephone,
    "phone_number": phone_number,
    "isflag": !isflag ? "0" : isflag
  };
  let url = setUrl("etm_api","/lola_cms_Interface/manage/addresses.do?m=add");
  // let url = setUrl("etm_api","/manage/xt/man.do?m=add&data=one");
  return post(url, params, {'Content-Type': 'application/json', 'ticket': __getTicket()});
}

/**
 * 删除收货地址接口
 * @param id 收货地址主键id
 * @returns {Object}
 */
export function delAddress(id) {
  let params = {
    // "pb_UrlId":"177",
    "id": id
  };
  let url = setUrl("etm_api","/lola_cms_Interface/manage/addresses.do?m=delete")
  // let url = setUrl("etm_api","/manage/xt/man.do?m=del&data=rows")
  return post(url, params, {'Content-Type': 'application/json', 'ticket': __getTicket()});
}

/**
 * ytmwb2b获取大公共产品
 * @returns {*}
 */

export function getYtmwb2bProducHall(side_code) {
  let url=`${RESOURCE_ROOT}/api/v1/product_halls?site_code=${side_code}`;
  return get(url);
}

/**
 *
 * 分页获取套餐馆
 * @returns {*}
 */
export function getDiningHallList(pageNo,tcType) {
  let params = {
    "page": pageNo,
    "site_code": SITE_CODE,
    "page_size": 9,
  };
  if(tcType){
    params.tcType = tcType
  }
  let url = setUrl("rc_cms",`/lola_cms_Interface/package/packageForLimit.do`);
  return post(url, params, {'Content-Type': 'application/json'})
}

/**
 * 获取套餐馆详情
 * @returns {*}
 */
export function getDiningHallDetail(docCode){
  let params = {
    "docCode": docCode
  };
  let url = setUrl("rc_cms",'/lola_cms_Interface/package/packageDetail.do');
  return post(url, params, {'Content-Type': 'application/json'})
}

/**
 * 可选购套餐
 * @returns {*}
 */
export function forChoice(docCode) {
  let params = {
    "docCode": docCode
  };
  let url = setUrl("rc_cms",'/lola_cms_Interface/package/getPackagesForChoice.do')
  return post(url, params, {'Content-Type': 'application/json'} )
}

/**
 * 获取相关套餐包
 * @returns {*}
 */
export function getRelated(TCtype2,docCode) {
  let params = {
    "TCtype2": TCtype2,
    "docCode": docCode,
    "docType": SITE_CODE
  };
  let url = setUrl("rc_cms",'/lola_cms_Interface/package/getRelatedPackageDetails.do')
  return post(url, params, {'Content-Type': 'application/json'})
}


//获取财务系统余额
export function getBalance() {
  let customer_no = __getCustomerNo()
  let site_code = __getSiteCode();
  let url = '/cw';
  let param = {
    api_path: '/api/v1/sub_balances',
    customer_no: customer_no,
    site_code: site_code
  };
  return get(url, param)
}

//获取本地用户ID
function __getUserId() {
  return '21';
}

//获取本地用户名称
function __getUserName() {
  return '盈丰建材公司';
}

//获取本地用户所在平台
function __getSiteCode() {
  return SITE_CODE;
}

//获取客户编号
function __getCustomerNo() {
  return 'S01212';
}

let productHalls;

//获取商品馆信息
function __getHallId() {
  // return productHalls;
  return '20,40,60,80';
}

function __getWarehouse() {
  return '佛山仓';
}

//用户等级： 1 游客 2 注册会员 3 vip
function __getUserLevel() {
  return 1;
}

// get ticket
function __getTicket(){
  console.log("window.ticket",window);
  return window.ticket;
}
