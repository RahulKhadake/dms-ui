// import { Component, OnInit } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';

// @Component({
//   selector: 'app-material-add-editpopup',
//   templateUrl: './material-add-editpopup.component.html',
//   styleUrls: ['./material-add-editpopup.component.css']
// })
// export class MaterialAddEditpopupComponent implements OnInit {

//   constructor(public dialogRef: MatDialogRef<MaterialAddEditpopupComponent>) { }
//   isExpriySelected:boolean = false;

//   ngOnInit(): void {
//   }

//   addEditMaterial(){
//     this.dialogRef.close();
//   }

//   expiryDateChange(event:any){
//     console.log(event.target.value);
//     this.isExpriySelected = event.target.value == "Yes" ? true:false;
//   }
// }

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

 import {Component,OnInit} from '@angular/core';
 import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
 import { MatDialog } from '@angular/material/dialog';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AddIdentifierComponent } from '../add-identifier/add-identifier.component';
import { AddProductGroupComponent } from '../add-product-group/add-product-group.component';
import { AddProductSubGroupComponent } from '../add-product-sub-group/add-product-sub-group.component';
import { SelectProductComponent } from '../select-product/select-product.component';
import { AddMaterialsService } from 'src/app/services/add-materials.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClassificationserviseService } from 'src/app/services/classificationservise.service';
 /**
  * @title Stepper animations
  */
 @Component({
  selector: 'app-material-add-editpopup',
  templateUrl: './material-add-editpopup.component.html',
  styleUrls: ['./material-add-editpopup.component.css']
 })
 export class MaterialAddEditpopupComponent {
  disabled = false;
  catgname:any=[];
  dropdownSettings2: IDropdownSettings = {};
  dropdownSettings3: IDropdownSettings = {};
  toppingList2:  any= []; 
  toppingList3:  any= [];
  actineLabel:any ; // countryname: string[] = ['Malaysia (71/126)', 'India (178/178)','Philipines (0/135)'];
  // statename: string[] = ['Johor(0/42)', 'Kedah(36/36','Perak(14/26)','Penang(21/22)'];
  regionname: string[] = ['North(4/4)', 'South(8/8)', 'East(6/6)','West(3/4)'];
  cityname:string[] =['George town','Balik Pulau','Batu Refringi','Teluk Bahang'];
  toprint:boolean=false;
  addButton:boolean =false;
  removelist:boolean =false;
  toggle:boolean=true;
  selectedItem:any = [];
  stateselectedItem:any = [];
  distselectedItem:any =[];
  citySelectedItem:any =[]
  ShowFilter = false;
  subCategoryFilter=false;
  myForm: any = FormGroup;
  toppings: any = [];
  toppings1: any = [];
  toppings2: any = [];
  productList:any = [];
  materialIdentifier:any=[];
  // selectedItems: any;
  selectedItems1: any;
  selectedItems2: any;
  selectedItems3: any;
  selectedItems4: any;
  selectedItems5: any;
  selectedItems6: any;
  selectedItems7: any;
  sub_category:any;
  typeI:any;
  rowData5:any=[];
  subProduct:any = [];
  countryList:any =[];
  countStates:any;
  stateList:any =[];
  countDist:any;
  distList:any =[];
  countCity:any;
  cityList:any =[];
  session:any;
  getEditId:any;
  catId:any;
  subCatId:any;
  typeId:any;
  productId:any;
  subProductId:any;
  uomID:any;
  materialName:string ='';
  description:string ='';
  desc:any;
  nameM:any;
  expiryDate:string ='';
  BrandName:string = '';
  gloabKey:any;
  Sku:any;
  shortCode:any;
  Sort:any;
  AddSP:any;
  prodId:any;
  editData:boolean = false;
  dropdownSettings: IDropdownSettings = {};
  selectfld: any = ['mrp','aty'];
  image1 = 'assets/img/minimize-tag.png';
  countrySelected = true;
  RegionExpanded = true;
  CityExpanded = true;
// geograhies related variables
  gepGraphiesFormGroup!: FormGroup;

   geoGraphyHirerachyData: any;
   geoGraphyFullData: any;

   geographyHierarchyId: any;
   aarrayToPush: any[] = [];
   css: any[] = [];
   colorsList = [
     { primaryColor: { background: '#00187A', color: '#fff' }, secondaryColor: { background: "#EAEEFF", color: "#00187A" }, },
     { primaryColor: { background: '#0C5A3E', color: '#fff' }, secondaryColor: { background: "#E6FFF6", color: "#0C5A3E" }, },
     { primaryColor: { background: '#C32F27', color: '#fff' }, secondaryColor: { background: "#FFEDEC", color: "#C32F27" }, },
     { primaryColor: { background: '#3D1A00', color: '#fff' }, secondaryColor: { background: "#D6C8C3", color: "#3D1A00" }, },
     { primaryColor: { background: '#DC0063', color: '#fff' }, secondaryColor: { background: "#FFE1EE", color: "#DC0063" }, },
     { primaryColor: { background: '#8000E2', color: '#fff' }, secondaryColor: { background: "#EFDAFF", color: "#8000E2" }, },
     { primaryColor: { background: '#0E4C6D', color: '#fff' }, secondaryColor: { background: "#D6F1FF", color: "#0E4C6D" }, },
     { primaryColor: { background: '#00187A', color: '#fff' }, secondaryColor: { background: "#EAEEFF", color: "#00187A" }, },
     { primaryColor: { background: '#0C5A3E', color: '#fff' }, secondaryColor: { background: "#E6FFF6", color: "#0C5A3E" }, },
     { primaryColor: { background: '#C32F27', color: '#fff' }, secondaryColor: { background: "#FFEDEC", color: "#C32F27" }, },
     { primaryColor: { background: '#3D1A00', color: '#fff' }, secondaryColor: { background: "#D6C8C3", color: "#3D1A00" }, },
     { primaryColor: { background: '#DC0063', color: '#fff' }, secondaryColor: { background: "#FFE1EE", color: "#DC0063" }, },
   ];

   constructor(private fb: FormBuilder, public dialog: MatDialog,
     private spinner: NgxSpinnerService, private addMaterials: AddMaterialsService,
     private classification: ClassificationserviseService) { }


   firstFormGroup: FormGroup = this.fb.group({ firstCtrl: [''] });
   secondFormGroup: FormGroup = this.fb.group({ secondCtrl: [''] });
   thirdformGroup:FormGroup = this.fb.group({ thirdCtrl: [''] });

   ngOnInit():void {

    this.getGeographyHierarchy();

    this.getProductList();
    this.selectedItems1 = ["Shivam"];
    this.selectedItems2 = [];
    this.selectedItems3 = [];
    this.selectedItems4 = [];
    this.selectedItems5 = [];
    this.selectedItems6 = [];
    this.selectedItems7 = [];
     this.editList()
this.getclassification();
this.getAllUom();
this.getMaterialIdentifier();
this.countryData();
   }
   onKey(event) {
    let inputName = event.target.value;
  this.materialName = inputName;
  console.log("inputName" ,this.materialName)
  }
  onKeyDesc(event) {
    let inputDesc = event.target.value;
  this.description =  inputDesc;
  console.log("description" ,this.description)
  }
  onKeyExpry(event) {
    let inputExpry = event.target.value;
  this.expiryDate =  inputExpry;
  console.log("expiryDate" ,this.expiryDate)
  }
  onKeyBrand(event) {
    let brandName = event.target.value;
  this.BrandName =  brandName;
  console.log("BrandName" ,this.BrandName)
  }
  onKeyGloabal(event) {
    let gloabK = event.target.value;
  this.gloabKey =  gloabK;
  console.log("gloabKey" ,this.gloabKey)
  }
  onKeySKU(event) {
    let sku = event.target.value;
  this.Sku =  sku;
  console.log("Sku" ,this.Sku)
  }
  onKeyShortCode(event) {
    let shortC = event.target.value;
  this.shortCode =  shortC;
  console.log("shortCode" ,this.shortCode)
  }
  onKeySort(event) {
    let sort = event.target.value;
  this.Sort =  sort;
  console.log("Sort" ,this.Sort)
  }
  onKeyAddSP(event) {
    let AddSp = event.target.value;
  this.AddSP =  AddSp;
  console.log("AddSP" ,this.AddSP)
  }
  editList(){
    this.getEditId = localStorage.getItem('listData');
    console.log("ListData",this.getEditId)
    let editV =localStorage.getItem('Edit');
    if(editV == 'Edit'){
      this.actineLabel = "Edit Material";
      this.addMaterials.onEditList(this.getEditId).subscribe((res) => {
        let data = res.response;
        console.log("EditData",data);
        this.editData = true;
      })
    }
    else{
      this.actineLabel = "Add Material";
      this.editData = false;
    }
  }
   getclassification() {

    this.addMaterials.getclassification().subscribe((res) => {
      let data = res.response;
      this.catgname = data.allOtherCats;
      // let dataCat = data.allOtherCats;
      this.selectedItems1 = new FormControl(this.catgname);
    })
  }
  getProductList(){
    this.addMaterials.getProductGroup().subscribe((res) => {
      let data =res.response;
      this.productList =data;
     let prodG = localStorage.getItem('productG')
     console.log("prodG",prodG)
    })
  }
  getMaterialIdentifier(){
    // this.addMaterials.getMaterialIdentifier().subscribe((res) => {
    //   let data = res.response;
    //  this.materialIdentifier =data;
    // })
    // this.dialogRef.close(this.form.value);
    let data:any =localStorage.getItem('session');
    console.log("Daatatatatatat5",data)
    this.selectedItems5 = JSON.parse(data);
    console.log("Selected Item 5",this.selectedItems5)
  }
  addMaterial(){
let data ={
  StockItemId:this.catId,
  StockItemSubCategoryId:this.subCatId,
  StockItemTypeId:this.typeId,
  StockItemName:this.materialName,
  StockItemDesc:this.description,
  BaseUoMId:this.uomID,
  Materialcustomidentifier:this.selectedItems5,
  ExpiryPeriod:this.expiryDate,
  BrandName:this.BrandName,
  GlobalCode:this.gloabKey,
  ProductSKUName:this.Sku,
  ShortCode:this.shortCode,
  ManualShortOrder:this.Sort,
  ProductLink:this.AddSP,
  ProductSubGroupId:this.selectedItems7,
  // ProductCustomIdentifierId:
  // IsProduct:
}
  }
   onSubCategoryAll(items: any) {
    console.log('onSelectAll', items);
  }
  onItemSelect(item:any){
    this.catId = item.catId;
    this.addMaterials.onclickcat(item.catId).subscribe((res) => {
      let subcaty = res.response;
      console.log("response1", res)
      console.log("catId", this.catId);
      this.sub_category = subcaty.allOtherSubCAts;
      this.toppings1 = new FormControl(this.sub_category);
    });
  }
  onSubCategorySelect(item:any){
    this.subCatId = item.subCatId;
    this.addMaterials.onclicksubcat(item.subCatId).subscribe((res) => {
      let typs = res.response;
      console.log("subCatId", this.subCatId);
      this.typeI = typs;
      console.log("Typess", this.typeI);
      this.toppings2 = new FormControl(this.typeI);
    });
  }
  onUomSelect(item:any){
      this.uomID = item.uoMId
      console.log("this.uomID",this.uomID)

  }
  onProductSelect(item:any){
    // alert(item.productGroupId);
     this.prodId = item.productGroupId;
    let prodName = item.productGroupName;
    sessionStorage.setItem("productId",this.prodId)
    sessionStorage.setItem("productName",prodName);
    console.log("item.productGroupId",item.productGroupId);
    this.productId = item.productGroupId;
    this.addMaterials.getProductSubGroup(item.productGroupId).subscribe((res) => {
      let subProd = res.response;
      console.log("subProd", subProd);
      this.subProduct = subProd;
      // this.toppings2 = new FormControl(this.typeI);
    });
  }
  onSubProductSelect(item:any){
    // alert(item.productGroupId);
    console.log("item.productGroupId",item.productGroupId);
    this.subProductId = item.productGroupId;
  }
  countryData(){
    this.addMaterials.getCountryList().subscribe((res) => {
      let data = res.response;
     this.countryList=data.allOtherCountries;
     console.log("country LIst");
              //  let firstCountr =data.firstCountr;
          this.getStateList(data.firstCountr.countryId);
          this.selectedItem=data.firstCountr.countryId;
    })
  }
  // getCountryList(){
  //   this.calssification.getCountryList().subscribe((res)=>{
  //         let data=res.response;
  //         this.countCountry=res.response.allOtherCountries.length;
  //         this.CountryList=data.allOtherCountries;
  //         this.firstCountr =data.firstCountr;
  //         this.getStateList(data.firstCountr.countryId);
  //         this.selectedItem=data.firstCountr.countryId;
         
  //       })  
  // }
  getStateList(id:any){
    localStorage.setItem('countryId',id);
    this.selectedItem= id;
    this.addMaterials.getAllListByCountry(id).subscribe((res)=>{
          let data=res.response;
          this.countStates=data.allOtherGeography.length;
          this.stateList=data.allOtherGeography;
          this.stateselectedItem = data.firstGeography.geographyId;
          this.getDistrictList(data.firstGeography.geographyId)
        })
  }
  getDistrictList(id:any){
    this.stateselectedItem = id;
    localStorage.setItem("stateId",id);
    this.addMaterials.getAllListByCountry(id).subscribe((res)=>{
          let data=res.response;
          this.countDist=data.allOtherGeography.length;
          this.distList=data.allOtherGeography;
          this.distselectedItem = data.firstGeography.geographyId;
          this.getCityList(data.firstGeography.geographyId);
        })
  }
  getCityList(id:any){
    this.distselectedItem = id;
    localStorage.setItem('distId',id);
    this.addMaterials.getAllListByCountry(id).subscribe((res)=>{
          let data=res.response;
          this.countCity=data.allOtherGeography.length;
          this.cityList=data.allOtherGeography;
          this.citySelectedItem = data.firstGeography.geographyId;
        })
  }
  getAllUom(){
    const data={
      search:"",
    }
    this.addMaterials.getuomDeatils(data).subscribe((res: any) => {
      console.log('uom list',res.response)
      
     this.rowData5=res.response;
    });
  }
  onIdentiSelect(item:any){
// alert(item.materialCustomName)
  }
  onTypeSelect(item: any) {
    this.typeId = item.typeId;
  }
  onTypeAll(item:any){
    console.log(item);
  }
  cname1(cname:string,i:any){
    
    if(cname=='Eectronics'){
      // this.Sname= ['mobile', 'earphone','mouse'];
    }
    if(cname!='Eectronics'){
      // this.Sname= ['fan','fridge'];
    

    }
  }
  printvalue(valueofprint:boolean){
    this.toprint=valueofprint;
  }
  addCategory(){
    this.addButton =true;
  }
  
    onClick(item) {
    this.selectedItem = item;
  }
  selectProduct(){
    this.dialog.open(SelectProductComponent);
    this.getMaterialIdentifier();
  }
  addproduct(){
    this.dialog.open(AddProductGroupComponent);
    
  }
  addproductsubgroup(){
    this.dialog.open(AddProductSubGroupComponent);
    
  }
  customIdentifier(){
    this.dialog.open(AddIdentifierComponent);
  }
  expandGeoInfoDiv(){
    this.countrySelected = !this.countrySelected;

    if(this.countrySelected === false){
      this.image1 = 'assets/img/maximize-arrow.png';
    } else {
      this.image1 = 'assets/img/minimize-tag.png';
     
    }
  }
  RegionExpandDiv(){
    this.RegionExpanded= !this.RegionExpanded;

    if(this.RegionExpanded === false){
      this.image1 = 'assets/img/maximize-arrow.png';
    } else {
      this.image1 = 'assets/img/minimize-tag.png';
     
    }
  }
  CityExpandDiv(){
    this.CityExpanded= !this.CityExpanded;

    if(this.CityExpanded === false){
      this.image1 = 'assets/img/maximize-arrow.png';
    } else {
      this.image1 = 'assets/img/minimize-tag.png';
     
    }
  }

// geograhies related apis

getGeographyHierarchy() {
  this.spinner.show();
  this.geoGraphyHirerachyData = null;
  this.classification.getGeographyHierarchy().subscribe(res => {
    // console.log(res);
    this.spinner.hide();
    this.geoGraphyHirerachyData = res.response;

    console.log('geoGraphyHirerachyData', this.geoGraphyHirerachyData);


    this.geoGraphyFullData = JSON.parse(JSON.stringify(res.response));
    console.log('geoGraphyFullData', this.geoGraphyFullData);
    const hdata = this.geoGraphyFullData.find(a => a.primaryGeographyAssociation == 'Y');

    console.log('hdata', hdata)

    this.geographyHierarchyId = hdata.geographyHierarchyId
    const data = this.geoGraphyFullData.findIndex(a => a.primaryGeographyAssociation == 'Y');
    this.geoGraphyFullData = this.geoGraphyFullData.slice(0, data + 1)

    console.log('data to console1', this.geoGraphyFullData.slice(0, data + 1))


    console.log('geoGraphyFullData', this.geoGraphyFullData);

    this.getGeographiesDataById(null, 1);
  }, err => {
    console.log(err);
    this.spinner.hide();
  })

}


selectGeoGraphy(clickedItem, hirerachyIndex,) {

  console.log(clickedItem, hirerachyIndex);


  // if (this.geographyHierarchyId == hirerachyIndex) {
  //   this.css.push(clickedItem)

  //   const index = this.aarrayToPush.indexOf(clickedItem.geographyId);

  //   if (index !== -1) {
  //     this.aarrayToPush.splice(index, 1);
  //   }
  //   else {
  //     this.aarrayToPush.push(clickedItem.geographyId);

  //   }

  //   console.log('aarrayToPush', this.aarrayToPush)
  // }
  // else {
  //   this.aarrayToPush = []
  // }

  this.geoGraphyFullData[hirerachyIndex - 1].allOtherGeography.forEach(element => {
    if (element.geographyId == clickedItem.geographyId) {
      let index = this.geoGraphyFullData[hirerachyIndex - 1].geographySelected.indexOf(element.geographyId);
      if (index == -1) {
        if (hirerachyIndex == this.geoGraphyFullData.length) {
          this.geoGraphyFullData[hirerachyIndex - 1].geographySelected.push(element.geographyId);
          this.geoGraphyFullData[hirerachyIndex - 1].geographyNamesSelected.push(element.geographyName);
        } else {
          this.geoGraphyFullData[hirerachyIndex - 1].geographySelected = [element.geographyId];
          this.geoGraphyFullData[hirerachyIndex - 1].geographyNamesSelected = [element.geographyName];
          this.getGeographiesDataById(element.geographyId, (hirerachyIndex + 1));
          this.removeOtherGeographiesData(hirerachyIndex);
        }
      } else {
        this.geoGraphyFullData[hirerachyIndex - 1].geographySelected.splice(index, 1);
        this.geoGraphyFullData[hirerachyIndex - 1].geographyNamesSelected.splice(index, 1);
        this.removeOtherGeographiesData(hirerachyIndex);
      }
    }


  });
  console.log(this.geoGraphyFullData);
}


removeOtherGeographiesData(hirerachyIndex) {
  for (var i = hirerachyIndex; i < this.geoGraphyFullData.length; i++) {
    this.geoGraphyFullData[i].allOtherGeography = [];
    this.geoGraphyFullData[i].geographySelected = [];
    this.geoGraphyFullData[i].geographyNamesSelected = [];
    this.geoGraphyFullData[i].geographyCount = 0;
    this.geoGraphyFullData[i].showAddIcon = false;
  }

}
getGeographiesDataById(id, hirerachyIndex = 0) {
  this.spinner.show();
  console.log(id, hirerachyIndex);
  this.classification.getGeographiesById(id, hirerachyIndex).subscribe(geographiesRes => {
    console.log(geographiesRes);
    this.spinner.hide();
    this.geoGraphyFullData[hirerachyIndex - 1].allOtherGeography = geographiesRes.response.allOtherGeography ?? [];
    this.geoGraphyFullData[hirerachyIndex - 1].geographySelected = [];
    this.geoGraphyFullData[hirerachyIndex - 1].geographyNamesSelected = [];
    this.geoGraphyFullData[hirerachyIndex - 1].geographyCount = this.geoGraphyFullData[hirerachyIndex - 1].allOtherGeography.length;
    this.geoGraphyFullData[hirerachyIndex - 1].showAddIcon = true;

  }, err => {
    console.log(err);
    this.spinner.hide();
  })
}

 }

 
  
 