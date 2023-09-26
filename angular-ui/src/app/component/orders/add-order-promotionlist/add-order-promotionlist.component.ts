import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { CellClickedEvent, CellValueChangedEvent, ColDef, FirstDataRenderedEvent, GridApi, GridReadyEvent } from 'ag-grid-community';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrdersApisService } from 'src/app/services/orders-apis.service';
import { SharedimageService } from 'src/app/sharedimage.service';
import { ViewPromotionPopupComponent } from '../../pramotion-action/view-promotion-popup/view-promotion-popup.component';
import { Item } from '@generic-ui/ngx-grid/core/structure/source/src/api/item/item';


@Component({
  selector: 'app-add-order-promotionlist',
  templateUrl: './add-order-promotionlist.component.html',
  styleUrls: ['./add-order-promotionlist.component.css']
})
export class AddOrderPromotionlistComponent implements OnInit {  
  // taxtemplete :any =['hj','hj'];
  
  
  PromotionID: any;
 

  otherInputValue:any;
  MOQ:any;
  Remarks :any;
  startDate:any;
  image3 = 'assets/img/expandarrows.svg';
  imageUrl: any | null = null;
  private gridApi!: GridApi;
  promoList = true;
  priceD = true;
  buysets = true;
  rowData: any;
  columnDefs: any;
  griddatapromotions: any = [];
  copyGridPromotions: any = [];
  actineLabel: any;
  updateOrSave: boolean = false
  editData: boolean = false;
  image = 'assets/img/expandarrows.svg';

  buygg: any;
  selectedrowList: any = [];
  ischecked: boolean = false;

  geographyId: any;
  dealerid: any;
  arrayOfImages: any = [];
  imagesapis: any = [];
  imagesid: any = [];
  taxdropdowndata: any = [];
  quantityadd: any = 0;
  price: any = 0;
  griddata: any = [];
  // promotions payloads
  promotionstype3: any = [];
  promotionstype4: any = [];
  promotionstype1: any = [];
  promotionstype2: any = [];
  materialcustomidentifier:any;
  currentSelectedPromos: any = [];
  isOrderPromotionValid: boolean = false;
  
  stockItem:any;
  promos:any
   totalSelectedQuantity: number=0;
  



  constructor(private user: UserService,
    private orders: OrdersApisService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<any>,
    private http: HttpClient,
    private sharedImageService: SharedimageService,
    @Inject(MAT_DIALOG_DATA) public data: any) {  
   }
   registrationNumber:any;
   result: any;
   quantity:number|any
   storedValue:number=0;
   storedForthProvalue:number=0;
   storedTotalAmount:number=0;
   StoredForhtPromoTotalAmount:number=0;
   StoreThreePromotionsselectedqty:number=0;
   StoredThreePromoTotalAmount:number=0;
  
  ngOnInit(): void { 
    // 1 Promotions Selected Quantity
    const storedValuenumber = localStorage.getItem('FirstPromotionCalculation');
    if (storedValuenumber !== null) {
      this.storedValue = parseInt(storedValuenumber);
    }

    // 1 Promotions Total Amount
    const totalAmountnumber = localStorage.getItem('FirstPromotionTotalAmountValue');
    if (totalAmountnumber !== null) {
      this.storedTotalAmount = parseInt(totalAmountnumber);
    }
    
    // 4th Promotion Quantity
    const StoredValueNumber = localStorage.getItem('ForthPromotionCalculationsTotalQty');
    if (StoredValueNumber !== null) {
      this.storedForthProvalue = parseInt(StoredValueNumber);
      console.log(this.storedForthProvalue,'Check reee')
    }

    // 4 Promotion Total Amount
    const TotalAmountnumber = localStorage.getItem('ForthPromotionCalculationsAmount');
    if (TotalAmountnumber !== null) {
      this.StoredForhtPromoTotalAmount = parseInt(TotalAmountnumber);
    }

  //  3 Promotions Quantity
  const StoredthreePromotionsQuantityNumber = localStorage.getItem('ThreeePromotionCalculationsTotalQty');
    if (StoredthreePromotionsQuantityNumber !== null) {
      this.StoreThreePromotionsselectedqty = parseInt(StoredthreePromotionsQuantityNumber);
      console.log(this.StoreThreePromotionsselectedqty,' 3 Promotions total quantity Check reee')
    }

      // 3 Promotion Total Amount
      const StoreTotalAmountnumberthreePromotions = localStorage.getItem('ThreePromotionCalculationsAmount');
      if (StoreTotalAmountnumberthreePromotions !== null) {
        this.StoredThreePromoTotalAmount = parseInt(StoreTotalAmountnumberthreePromotions);
      }
 
  
    this.MOQ=localStorage.getItem('MOQ');
        this.imageUrl = localStorage.getItem('clickedImageURL');
        console.log("THis.Image",this.imageUrl)
        this.imageUrl = JSON.parse(this.imageUrl)
    console.log(this.imageUrl,"IMAGE")
    this.taxdropdown();

    let editV = localStorage.getItem('Edit');

    if (editV == 'Edit') {
      this.actineLabel = "Edit order";
      this.updateOrSave = !this.updateOrSave;
    }
    else {
      this.actineLabel = "Add order";
      this.editData = false;
      // this.updateOrSave= this.updateOrSave;
      // this.editorderbyID = {};
    }


    this.geographyId = localStorage.getItem("geographyId");
    console.log(this.geographyId, "this.geographyId")
    this.dealerid = localStorage.getItem("dealerid");
    console.log(this.dealerid, "this.this.dealerid")
    this.currentSelectedPromos = this.data.selectedData ?? [];
    this.imagesid = this.data.imagesid;
    // this.arrayOfImages.forEach(x => {
    //   if (x.isSelected) this.imagesid.push(x.productPromotionsId);
    // })
    // if (this.imagesid.length > 0)
      this.getProductsOfPromotionForOrder();
  }


  buysetsGroups(item) {
    // this.buysets = !this.buysets;
    let selectedGrp = this.griddatapromotions.find(x => x.productPromotionsId == item.productPromotionsId);
     selectedGrp.isShowPromos = !selectedGrp.isShowPromos;
  }
  showPromotionInfo(e,promotionItem) {
    e.stopPropagation();
    localStorage.setItem('promoclickId', promotionItem.productPromotionsId)
    localStorage.setItem('promoclickName', promotionItem.promotionName)
    const config: MatDialogConfig = {
      minWidth: '90vw',
      height: '610px',
      autoFocus: false,
      data: { hideGeoDealer: true }
    };
    this.dialog.open(ViewPromotionPopupComponent, config);
  }

  taxdropdown() {
    this.orders.taxtemplatedropdown().subscribe((res) => {
      this.taxdropdowndata = res.response;
      console.log(this.taxdropdowndata, "tax data")

    });
  }
  
  
  
  ForthPromotionsearch;
  ThirdPromotion;
  searchText;
  searchTextFreeItems;
  searchTextSecondPromotion;
  searchTextSecondPromotionfree;


  
  
  viewpromotions:any;
  expandPromotions() {
    // this.viewpromotions = !this.viewpromotions;

    // if (this.viewpromotions === false) {
    //   this.image3 = 'assets/img/maximize-arrow.png';
    // } else {
    //   this.image3 = 'assets/img/minimize-tag.png';

    // }
  }

  // promotion 

  // getPromotionsImages() {
  //   let data = {
  //     "Dealerid": this.dealerid,
  //     "GeographyIdid": this.geographyId
  //   }
  //   console.log(data, "dealer and ge data");
  //   this.spinner.show();
  //   this.orders.orderpromotionimages(data).subscribe((res: any) => {
  //     this.imagesapis = res.response
  //     this.spinner.hide();
  //     console.log(this.imagesapis, "imagesres");
  //     this.imagesapis.forEach(item => {
  //       console.log(this.currentSelectedPromos);
  //       let index = this.currentSelectedPromos.findIndex(x => (x.promotionId == item.promotionId || x.promotionId == item.productPromotionsId));
  //       let obj = {
  //         "productPromotionsId": item.productPromotionsId,
  //         // shd kep is selected as flase
  //         "isSelected": index !== -1 ? true : false,
  //         "promotionTypesId": item.promotionTypesId,
  //         "promotionName": item.promotionName,
  //         "imageurl": item.imageurl
  //       }
  //       this.arrayOfImages.push(obj);
  //     });

  //     // let previousSelectedPromos = []
  //     this.arrayOfImages.forEach(x => {
  //       if (x.isSelected) this.imagesid.push(x.productPromotionsId);
  //     })
  //     if (this.imagesid.length > 0)
  //       this.getProductsOfPromotionForOrder();

  //   });
  // }
  
  

  getpromotionlistById(e, item) {
    // console.log(e, item);
    console.log(item)
    if (this.imagesid.indexOf(item.productPromotionsId) == -1) {
      item.isSelected = true;
      this.imagesid.push(item.productPromotionsId);
      console.log(item.productPromotionsId)
      this.getProductsOfPromotionForOrder();
    } else {
      item.isSelected = false;
      this.imagesid.splice(this.imagesid.indexOf(item.productPromotionsId), 1);
      this.griddatapromotions.splice(this.griddatapromotions.findIndex(x => x.productPromotionsId == item.productPromotionsId), 1);
      this.orderPromotionEnableValidate();
    }
  }
  ProductPromotionOrderList: any[] = [];
  getProductsOfPromotionForOrder() {
    let data = {
      "ProductPromotionId": this.imagesid.filter((id, index) => index === this.imagesid.indexOf(id)), // Only consider the first selected ID
      "Dealerid": this.dealerid,
      "GeographyIdid": this.geographyId
    }
  
    this.spinner.show();
    console.log(this.imagesid, "listdatapromotionsids")
    this.orders.GetProductsOfPromotionForOrder(data).subscribe((res: any) => {
        // this.griddatapromotions = res.response;

      // this.griddatapromotions.map(item => {
      //   item.isShowPromos = false;
      //   item.isProductSelected = false;
      //   return item;
      // });
      
      this.Remarks = res.response?.remarks;
      this.PromotionID=res.response.promotionTypesId
      console.log("ResponseData",res.response)
      // this.MOQ=res.response[0]?.promoDetails?.buyGroups[0]?.moq
      // this.GETMOQ=res.response[0]?.promoDetails?.getGroups[0]?.moq
      console.log(this.MOQ,"check moq");
      console.log(this.GETMOQ,"check  get groups moq");
      
    
     
      this.ProductPromotionOrderList = res.response;
      console.log(this.ProductPromotionOrderList,"======")
      
      this.orderPromotionFormatter(this.ProductPromotionOrderList);
      
      this.spinner.hide();
      console.log(this.griddatapromotions, "griddata and checking MOQ");
      
    });
  }  
  GETMOQ:any;
  promoDetails:any;

  appendStockItemFields(stockItem, productPromotions) {
    let formatObj: any = {};
    console.log(this.currentSelectedPromos);
    let promotion = this.currentSelectedPromos.find(x => x.promotionId == productPromotions.productPromotionsId);
   
    if (promotion){
     
       let exisistItem = promotion.itemDetails.find(y => y.stockitemid == stockItem.stockitemid);
      if (exisistItem){
       
         var tempStockItem = JSON.parse(JSON.stringify(exisistItem));
        tempStockItem.isProductSelected = true;
        productPromotions.isShowPromos = true; 
        tempStockItem.productSKUName = stockItem.productSKUName;
        stockItem = tempStockItem;
       } 
  }

    formatObj.customerPOProductId = stockItem.customerPOProductId ?? 0;
    formatObj.stockitemid = stockItem.stockitemid;
    formatObj.stockitemname = stockItem.stockitemname;
    formatObj.productSKUName = stockItem.productSKUName;
    formatObj.price = stockItem.price;
    formatObj.stock = stockItem.stock
    formatObj.isProductSelected = stockItem.isProductSelected == undefined ? false : stockItem.isProductSelected;
    formatObj.Quantity = stockItem.quantity == undefined ? null : stockItem.quantity;
    formatObj.Taxid = stockItem.taxid;
    formatObj.registrationNumber = stockItem.registrationNumber;
    formatObj.moq = stockItem.moq;
    formatObj.remarks = stockItem.remarks;
    formatObj.promotionTypesId = stockItem.promotionTypesId;
    formatObj.materialcustomidentifier = stockItem.materialcustomidentifier;
    formatObj.materialCustomName=stockItem.materialCustomName;

    return formatObj;
  }
  

  orderPromotionFormatter(promotionList) {

    promotionList.forEach(item => {

      let exisitPromotion = this.griddatapromotions.find(x => x.productPromotionsId === item.productPromotionsId);

      if (!exisitPromotion) {
        // check first
        item.isShowPromos = true;
        item.isProductSelected = false;
        item.showWarningMsg = false;

        switch (item.promotionTypesId) {
          case 1:

            if (item.promoDetails && item.promoDetails.buyGroups && item.promoDetails.buyGroups && item.promoDetails.buyGroups.length != 0) {
              item.promoDetails.buyGroups.forEach(stockItem => {
                if (stockItem.stockitemid.length != 0) {
                  stockItem.stockitemid = stockItem.stockitemid.map(stock => {
                    stock = this.appendStockItemFields(stock, item);
                    return stock
                  })
                }

              });
              item.promoDetails.buyGroups.totalQuantity = 0;
              item.promoDetails.buyGroups.totalAmount = 0;
            }

            // getgroups
            if (item.promoDetails && item.promoDetails.getGroups && item.promoDetails.getGroups && item.promoDetails.getGroups.length != 0) {

              item.promoDetails.getGroups.forEach(stockItem => {
                if (stockItem.stockitemid.length != 0) {
                  stockItem.stockitemid = stockItem.stockitemid.map(stock => {
                    stock = this.appendStockItemFields(stock, item);
                    return stock
                  })
                }

              });
              item.promoDetails.getGroups.totalQuantity = 0;
              item.promoDetails.getGroups.totalAmount = 0;
            }

            break;

          case 2:

            if (item.promoDetails && item.promoDetails.buySets && item.promoDetails.buySets && item.promoDetails.buySets.length != 0) {
              item.promoDetails.buySets.forEach(setItem => {
                setItem.buyGroups.forEach(stockItem => {
                  if (stockItem.stockitemid.length != 0) {
                    stockItem.stockitemid = stockItem.stockitemid.map(stock => {
                      stock = this.appendStockItemFields(stock, item);
                      return stock
                    })
                  }
                  stockItem.totalQuantity = 0;
                  stockItem.totalAmount = 0;
                });
              });
            }

            if (item.promoDetails && item.promoDetails.getSets && item.promoDetails.getSets && item.promoDetails.getSets.length != 0) {
              item.promoDetails.getSets.forEach(setItem => {
                setItem.getGroups.forEach(stockItem => {
                  if (stockItem.stockitemid.length != 0) {
                    stockItem.stockitemid = stockItem.stockitemid.map(stock => {
                      stock = this.appendStockItemFields(stock, item);
                      return stock
                    })
                  }
                  stockItem.totalQuantity = 0;
                  stockItem.totalAmount = 0;
                });
              });
            }

            break;

          case 3:
            if (item.promoDetails && item.promoDetails.stockitems && item.promoDetails.stockitems.length != 0) {
              item.promoDetails.stockitems = item.promoDetails.stockitems.map(stockItem => {
                stockItem = this.appendStockItemFields(stockItem, item);
                return stockItem
              });
              item.promoDetails.totalQuantity = 0;
              item.promoDetails.totalAmount = 0;
            }
            break;

          case 4:
            if (item.promoDetails && item.promoDetails.stockitems && item.promoDetails.stockitems.length != 0) {
              item.promoDetails.stockitems = item.promoDetails.stockitems.map(stockItem => {
                stockItem = this.appendStockItemFields(stockItem, item);
                return stockItem
              });
              item.promoDetails.totalQuantity = 0;
              item.promoDetails.totalAmount = 0;
            }
            break;

          default:
            break;
        }


        this.griddatapromotions.push(item);
      }


      this.PromotionQtyCalculation(item);
    });


    this.copyGridPromotions = JSON.parse(JSON.stringify(this.griddatapromotions));

  }

  updateInputEnableStatus(item) {

    item.promoDetails.buySets.forEach(setItem => {
      setItem.buyGroups.forEach(stockItem => {
        stockItem.isEnable = false;
        stockItem.stockitemid.forEach(stock => {
          if (setItem.isInputEnable || !(item.promoDetails.isBuyItemSelected)) {
            stockItem.isEnable = true;
          }
        });

      });
    });

    item.promoDetails.getSets.forEach(setItem => {
      setItem.getGroups.forEach(stockItem => {
        stockItem.isEnable = false;
        stockItem.stockitemid.forEach(stock => {
          if (setItem.isInputEnable || !(item.promoDetails.isGetItemSelected)) {
            stockItem.isEnable = true;
          }
        });

      });
    });
  } 
  
  quantityChange(data, updatedItem) {
    
    if (!updatedItem.isProductSelected) {  
      updatedItem.isProductSelected = true;
    } else if (!updatedItem.Quantity) {
      updatedItem.isProductSelected = false;
    }
    data.showWarningMsg = true;
    this.PromotionQtyCalculation(data);
    this.calculateTotalSelectedQuantity();  
    
  }

  calculateTotalSelectedQuantity() {
    let totalSelectedQuantity = 0;
    for (const data of this.griddatapromotions) {
      for (const group of data.promoDetails.buyGroups || []) {
        for (const item of group.stockitemid || []) {
          if (item.isProductSelected) {
            totalSelectedQuantity += item.Quantity || 0;
          }
        }
      }
    }
    this.totalSelectedQuantity = totalSelectedQuantity;
  }

  


  orderPromotionEnableValidate() {
    console.log(this.griddatapromotions,"PROMOTION TYPE ID ");
    
    this.isOrderPromotionValid = true;
   
    this.griddatapromotions.forEach(x => {
      if (x.promotionTypesId == 3 || x.promotionTypesId == 4) {
        if (!x.promoDetails.isItemValid || !x.promoDetails.isDiscountItemValid) {
          this.isOrderPromotionValid = false;
        }
      }
      if (x.promotionTypesId == 2 || x.promotionTypesId == 1) {
        if (!x.promoDetails.isGetItemValid || !x.promoDetails.isBuyItemValid) {
          this.isOrderPromotionValid = false;
          
              
        }
      }

    })
  }
  TotalthreePromotionAmount:number=0;
  calculateDiscountVolumeAmount(item) {
    item.promoDetails.isDiscountItemValid = false;
    item.promoDetails.DiscountAmount = 0;
    item.promoDetails.DiscountPercentage = 0;
    item.promoDetails.stockitems.forEach(stockItem => {
      stockItem.DiscountAmount = 0;
      stockItem.finalPrice = 0;

      if (stockItem.isProductSelected) {
        item.promoDetails.volumes.forEach(element => {
          if (element.minVolume <= item.promoDetails.totalQuantity && element.maxVolume >= item.promoDetails.totalQuantity) {
            stockItem.finalPrice = (stockItem.price) * (100 - element.discountPercentage) / 100;
            stockItem.DiscountAmount = (stockItem.Quantity) * stockItem.finalPrice;
            item.promoDetails.isDiscountItemValid = true;
            item.promoDetails.DiscountAmount += stockItem.DiscountAmount;
            item.promoDetails.DiscountPercentage = element.discountPercentage;
          }
        });
      }
    });
     // 3 Promotions TotalAmount Calculations
     this.TotalthreePromotionAmount=item.promoDetails.DiscountAmount;
     console.log("Checking Total Amount",item.promoDetails.DiscountAmount);
  
  }
 
  calculateDiscountAmount(item) {       
    item.promoDetails.isDiscountItemValid = false;
    item.promoDetails.DiscountAmount = 0;
    item.promoDetails.stockitems.forEach(stockItem => {
      stockItem.DiscountAmount = 0;
      stockItem.finalPrice = 0;
      if (stockItem.isProductSelected) {
        item.promoDetails.prices.forEach(element => {
          if (element.minVolume <= item.promoDetails.totalQuantity && element.maxVolume >= item.promoDetails.totalQuantity) {
            stockItem.finalPrice = (stockItem.Quantity) * (element.maxPrice);
            stockItem.DiscountAmount = element.maxPrice;
            item.promoDetails.isDiscountItemValid = true;
            item.promoDetails.DiscountAmount += stockItem.finalPrice;

            // 4 // TotalForthPromotionAmount Calculations
            this.totalPromotionOrderAmount=item.promoDetails.DiscountAmount;
          console.log("RK",item.promoDetails.DiscountAmount);
          localStorage.setItem('ForthPromotionTotalAmount',JSON.stringify(this.totalPromotionOrderAmount));

         
          
          }
          
        });
      }
    
    });

   
   
  }  

  totalPromotionOrderAmount: number = 0;
  selectedProQTY:number=0;
  TotalselectedQuantitythreePromotion:number=0;
  
  TotalForthPromotionAmount:number=0;
  PromotionQtyCalculation(item) {
   
  
    switch (item.promotionTypesId) {
      case 1:
        // buygroups
        item.promoDetails.isBuyItemValid = true;
        if (item.promoDetails && item.promoDetails.buyGroups && item.promoDetails.buyGroups && item.promoDetails.buyGroups.length != 0) {
          item.promoDetails.buyGroupsQty = 0;
          item.promoDetails.requiredGetGroupsQty = 0;
          item.promoDetails.buyGroups.forEach(stockItem => {
            stockItem.totalQuantity = 0;
            stockItem.totalAmount = 0;
            stockItem.isItemValid = true;
            if (stockItem.stockitemid.length != 0) {
              stockItem.stockitemid.forEach(stock => {
                if (stock.isProductSelected) {
                  stockItem.totalQuantity += stock.Quantity;
                  console.log(stockItem.totalQuantity,"dsvdvs")
                  

                   const totalQuantity = stockItem.totalQuantity;

                  //  this.totalQuantity = totalQuantity;
                  
                    localStorage.setItem('totalQuantity',totalQuantity);
                    
                  

                  stockItem.totalAmount += (stock.price * stock.Quantity);

                  const totalAmount = stockItem.totalAmount;
                    localStorage.setItem('totalAmount',totalAmount);

                  console.log(stockItem.totalAmount,"sdvsfsv")
                 

                  
                }
              })
              if (stockItem.maxVolume) {
                item.promoDetails.buyGroupsQty += Math.floor(stockItem.totalQuantity / stockItem.maxVolume);
              }
              if (stockItem.totalQuantity < stockItem.moq) {
                stockItem.isItemValid = false;
                item.promoDetails.isBuyItemValid = false;
              }
            }
          });
        }
        // getgroups
        item.promoDetails.getGroupsQty = 0;
        item.promoDetails.isGetItemValid = true;
        if (item.promoDetails && item.promoDetails.getGroups && item.promoDetails.getGroups && item.promoDetails.getGroups.length != 0) {
          item.promoDetails.getGroups.forEach(stockItem => {
            stockItem.totalQuantity = 0;
            stockItem.totalAmount = 0;
            stockItem.isItemValid = true;
            stockItem.foc = item.promoDetails.buyGroupsQty * stockItem.maxVolume;
            if (stockItem.stockitemid.length != 0) {
              stockItem.stockitemid.forEach(stock => {
                if (stock.isProductSelected) {
                  stockItem.totalQuantity += stock.Quantity;
                  stockItem.totalAmount += (stock.price * stock.Quantity);
                }
              })

              if (stockItem.totalQuantity !== stockItem.foc) {
                stockItem.isItemValid = false;
                item.promoDetails.isGetItemValid = false;
              }

            }

            // if (stockItem.maxVolume) {
            //   item.promoDetails.getGroupsQty += Math.floor(stockItem.totalQuantity / stockItem.maxVolume);
            // }

            // if (!(item.promoDetails.buyGroupsQty) || item.promoDetails.buyGroupsQty !== item.promoDetails.getGroupsQty) {
            //   stockItem.isItemValid = false;
            //   item.promoDetails.isGetItemValid = false;
            // } else if (item.promoDetails.buyGroupsQty && item.promoDetails.buyGroupsQty === item.promoDetails.getGroupsQty) {
            //   stockItem.isItemValid = true;
            //   item.promoDetails.isGetItemValid = true;
            // }
          });
        }
        item.promoDetails.totalAmount = item.promoDetails.buyGroups.reduce((total, stockItem) => {
          return total + (stockItem.totalAmount ?? 0);
        }, 0);
        this.totalPromotionOrderAmount = item.promoDetails.totalAmount;
        break;

      case 2:
      
        if (item.promoDetails && item.promoDetails.buySets && item.promoDetails.buySets && item.promoDetails.buySets.length != 0) {
          item.promoDetails.isBuyItemValid = true;
          item.promoDetails.isBuyItemSelected = false;
          item.promoDetails.buyGroupsQty = 0;
          item.promoDetails.buySets.forEach(setItem => {
            setItem.isInputEnable = false;
            setItem.buyGroups.forEach(stockItem => {
              stockItem.totalAmount = 0;
              stockItem.totalQuantity = 0;
              stockItem.isItemValid = true;
              if (stockItem.stockitemid.length != 0) {
                stockItem.stockitemid.forEach(stock => {
                  if (stock.isProductSelected) {
                    item.promoDetails.isBuyItemSelected = true;
                    setItem.isInputEnable = true;
                    stockItem.totalQuantity += stock.Quantity;
                    stockItem.totalAmount += (stock.price * stock.Quantity);
                  }
                
                })

                if (stockItem.maxVolume && stockItem.totalQuantity) {
                  item.promoDetails.buyGroupsQty += Math.floor(stockItem.totalQuantity / stockItem.maxVolume);
                }

                if (setItem.isInputEnable && stockItem.totalQuantity < stockItem.moq) {
                  stockItem.isItemValid = false;
                  item.promoDetails.isBuyItemValid = false;
                }
              }
            });

          });
        }

        // getgroups
        if (item.promoDetails && item.promoDetails.getSets && item.promoDetails.getSets && item.promoDetails.getSets.length != 0) {
          item.promoDetails.getGroupsQty = 0;
          item.promoDetails.isGetItemValid = true;
          item.promoDetails.isGetItemSelected = false;
          item.promoDetails.getSets.forEach(setItem => {
            setItem.isInputEnable = false;
            setItem.getGroups.forEach(stockItem => {
              stockItem.totalAmount = 0;
              stockItem.totalQuantity = 0;
              stockItem.isItemValid = true;
              stockItem.foc = item.promoDetails.buyGroupsQty * stockItem.maxVolume;
              stockItem.isInputEnable = false;
              if (stockItem.stockitemid.length != 0) {
                stockItem.stockitemid.forEach(stock => {
                  if (stock.isProductSelected) {
                    item.promoDetails.isGetItemSelected = true;
                    setItem.isInputEnable = true;
                    stockItem.totalQuantity += stock.Quantity;
                    stockItem.totalAmount += (stock.price * stock.Quantity);
                    // if(setItem.isInputEnable){
                    //   stockItem.isInputEnable = true;
                    // }
                  }
                })


                if (setItem.isInputEnable && stockItem.totalQuantity !== stockItem.foc) {
                  stockItem.isItemValid = false;
                  item.promoDetails.isGetItemValid = false;
                }

                // if (stockItem.maxVolume && stockItem.totalQuantity) {
                //   item.promoDetails.getGroupsQty += Math.floor(stockItem.totalQuantity / stockItem.maxVolume);
                // }
                // if (setItem.isInputEnable && item.promoDetails.buyGroupsQty !== item.promoDetails.getGroupsQty) {
                //   stockItem.isItemValid = false;
                //   item.promoDetails.isGetItemValid = false;
                // } else if (setItem.isInputEnable && item.promoDetails.buyGroupsQty == item.promoDetails.getGroupsQty) {
                //   stockItem.isItemValid = true;
                //   item.promoDetails.isGetItemValid = true;
                // }
              }
            });

          });
        }
        item.promoDetails.totalAmount = item.promoDetails.getSets.reduce((total, setItem) => {
          return total + setItem.getGroups.reduce((groupTotal, stockItem) => {
            return groupTotal + (stockItem.totalAmount ?? 0);
          }, 0);
        }, 0);
  
        // Calculate and store total promotion order amount for case 2
        this.totalPromotionOrderAmount = item.promoDetails.totalAmount;

        this.updateInputEnableStatus(item);
        break;

      case 3:
        if (item.promoDetails && item.promoDetails.stockitems && item.promoDetails.stockitems.length != 0) {
          item.promoDetails.totalQuantity = 0;
          item.promoDetails.totalAmount = 0;
          item.promoDetails.isItemValid = true;
          item.promoDetails.stockitems.forEach(stockItem => {
            if (stockItem.isProductSelected) {
              item.promoDetails.totalQuantity += stockItem.Quantity;
              item.promoDetails.totalAmount += (stockItem.price * stockItem.Quantity);

              
          //  3 Promotion Calculations Total Selected Quantity
              console.log(item.promoDetails.totalQuantity,"OMG")
              this.TotalselectedQuantitythreePromotion=item.promoDetails.totalQuantity;
              
            }
          });
          if (item.promoDetails.totalQuantity < item.promoDetails.moq) {
            item.promoDetails.isItemValid = false;
          }
        }
        this.calculateDiscountVolumeAmount(item);
        break;

      case 4:
        if (item.promoDetails && item.promoDetails.stockitems && item.promoDetails.stockitems.length != 0) {
          item.promoDetails.totalQuantity = 0;
          item.promoDetails.totalAmount = 0;
          item.promoDetails.isItemValid = true;
          item.promoDetails.stockitems.forEach(stockItem => {
            if (stockItem.isProductSelected) {
              item.promoDetails.totalQuantity += stockItem.Quantity;
              item.promoDetails.totalAmount += (stockItem.price * stockItem.Quantity);
              // stockItem.DiscountAmount = this.calculateDiscountAmount(item.promoDetails.prices, stockItem)

              // 4 Promotion Calculations
          this.selectedProQTY=item.promoDetails.totalQuantity;
         
        
             
            }
          });
          if (item.promoDetails.totalQuantity < item.promoDetails.moq) {
            item.promoDetails.isItemValid = false;
          }
          this.calculateDiscountAmount(item);
        }
        break;

      default:
        break;
       
      

    }

    this.orderPromotionEnableValidate();
    
  }
  checkboxChange(event, changedPromotionObj, promotionItem) {
    console.log(event, changedPromotionObj, "event, changedPromotionObj");
    changedPromotionObj.isProductSelected = event.target.checked;

    this.quantityadd = 0;
    this.price = 0;
    console.log(this.griddatapromotions, "data after selection");
    promotionItem.showWarningMsg = true;
    this.PromotionQtyCalculation(promotionItem);
    this.calculateTotalSelectedQuantity();
  }

  doubleClick(itemList, taxId) {
    if (taxId) {
      itemList.forEach(element => {
        if (element.isProductSelected) {
          element.Taxid = taxId;
        }
      });
    }
  }
  
 

   
  totalQuantity:any
  addPromoItems() {
    
   // payload for 3 and 4th promotions
    this.promotionstype1 = [];
    this.promotionstype2 = [];
    this.promotionstype3 = [];
    this.promotionstype4 = [];

    this.griddatapromotions.forEach(item => {
      switch (item.promotionTypesId) {
        case 1:


          let buysets: any = [];
          let getsets: any = [];


          // buygroups
          if (item.promoDetails && item.promoDetails.buyGroups && item.promoDetails.buyGroups && item.promoDetails.buyGroups.length != 0) {
            item.promoDetails.buyGroups.forEach(stockItem => {
              let selectedPromotionDatabuyset: any = [];
              if (stockItem.stockitemid.length != 0) {
                stockItem.stockitemid.forEach(stock => {
                  if (stock.isProductSelected) {
                    let obj = {

                      "Taxid": stock.Taxid,
                      "stockitemid": stock.stockitemid,
                      "Quantity": stock.Quantity,
                      "stock": stock.stock

                    };
                    selectedPromotionDatabuyset.push(obj)

                  }
                })
              }

              let buyGroupdata = {
                "GroupId": stockItem.groupId,
                "AddItems": selectedPromotionDatabuyset

              }

              buysets.push(buyGroupdata)

            });
          }
          // getgroups
          if (item.promoDetails && item.promoDetails.getGroups && item.promoDetails.getGroups && item.promoDetails.getGroups.length != 0) {
            item.promoDetails.getGroups.forEach(stockItem => {
              let selectedPromotionDatagetset: any = [];
              if (stockItem.stockitemid.length != 0) {
                stockItem.stockitemid.forEach(stock => {
                  if (stock.isProductSelected) {
                    let obj = {
                      "Taxid": stock.Taxid,
                      "stockitemid": stock.stockitemid,
                      "Quantity": stock.Quantity,
                      "stock": stock.stock

                    };
                    selectedPromotionDatagetset.push(obj)

                  }
                })
              }
              let getGroupdata = {
                "GroupId": stockItem.groupId,
                "AddItems": selectedPromotionDatagetset
              }
              getsets.push(getGroupdata)
            });
          }

          let data1 = {
            "PromotionId": item.productPromotionsId,
            "buySet": buysets,
            "getSet": getsets
          }
          this.promotionstype1.push(data1);

          break;
        case 2:
          let gpidandBysets: any = [];
          let gpidandgetsets: any = [];

          // buygrops
          if (item.promoDetails && item.promoDetails.buySets && item.promoDetails.buySets && item.promoDetails.buySets.length != 0) {
            item.promoDetails.buySets.forEach(setItem => {
              let buysets2: any = [];
              setItem.buyGroups.forEach(stockItem => {
                let selectedPromotionDatabuyset2: any = [];
                if (stockItem.stockitemid.length != 0) {
                  stockItem.stockitemid.forEach(stock => {
                    if (stock.isProductSelected) {
                      let obj = {
                        "Taxid": stock.Taxid,
                        "stockitemid": stock.stockitemid,
                        "Quantity": stock.Quantity,
                        "stock": stock.stock
                      };
                      selectedPromotionDatabuyset2.push(obj)
                    }
                  })
                }

                let buyGroupdata2 = {
                  "SetId": stockItem.set,
                  "AddItems": selectedPromotionDatabuyset2

                }

                buysets2.push(buyGroupdata2)
              });

              let groupid = {
                "GroupId": setItem.groupId,
                "Groups": buysets2
              }
              gpidandBysets.push(groupid)
            });
          }
          // getgroups

          if (item.promoDetails && item.promoDetails.getSets && item.promoDetails.getSets && item.promoDetails.getSets.length != 0) {
            item.promoDetails.getSets.forEach(setItem => {
              let getsets2: any = [];
              setItem.getGroups.forEach(stockItem => {
                let selectedPromotionDatagetset2: any = [];
                if (stockItem.stockitemid.length != 0) {
                  stockItem.stockitemid.forEach(stock => {
                    if (stock.isProductSelected) {
                      let obj = {

                        "Taxid": stock.Taxid,
                        "stockitemid": stock.stockitemid,
                        "Quantity": stock.Quantity,
                        "stock": stock.stock

                      };
                      selectedPromotionDatagetset2.push(obj)
                    }
                  })
                }
                let getGroupdata2 = {
                  "SetId": stockItem.set,
                  "AddItems": selectedPromotionDatagetset2

                }

                getsets2.push(getGroupdata2)
              });

              let groupid2 = {
                "GroupId": setItem.groupId,
                "Groups": getsets2
              }
              gpidandgetsets.push(groupid2)

            });
          }
          let data2 = {
            "PromotionId": item.productPromotionsId,
            "BuySets": gpidandBysets,
            "GetSets": gpidandgetsets

          }

          this.promotionstype2.push(data2);
          break;
        case 3:

          let selectedPromotionData3: any = [];

          if (item.promoDetails && item.promoDetails.stockitems && item.promoDetails.stockitems.length != 0) {
            item.promoDetails.stockitems.forEach(stockItem => {
              if (stockItem.isProductSelected) {
                let obj = {

                  "Taxid": stockItem.Taxid,
                  "stockitemid": stockItem.stockitemid,
                  "Quantity": stockItem.Quantity,
                  "stock": stockItem.stock

                };
                selectedPromotionData3.push(obj)
                // 3 Promotions calculations
                localStorage.setItem('ThreePrommotionTotalselectedQuantity',JSON.stringify(this.TotalselectedQuantitythreePromotion));
                localStorage.setItem('ThreePromotionTotalAmount',JSON.stringify(this.TotalthreePromotionAmount));

              }
            });
          }
          let data3 = {
            "PromotionId": item.productPromotionsId,
            "AddItems": selectedPromotionData3
          }
          this.promotionstype3.push(data3);
          break;
        case 4:
          let selectedPromotionData4: any = [];

          if (item.promoDetails && item.promoDetails.stockitems && item.promoDetails.stockitems.length != 0) {
            item.promoDetails.stockitems.forEach(stockItem => {
              if (stockItem.isProductSelected) {

                let obj = {

                  "Taxid": stockItem.Taxid,
                  "stockitemid": stockItem.stockitemid,
                  "Quantity": stockItem.Quantity,
                  "stock": stockItem.stock

                };
                selectedPromotionData4.push(obj)
                // 4 Promotion Calculations
                localStorage.setItem('ForthPromotionSelectedQTy',JSON.stringify(this.selectedProQTY));
               
              }
            });
          }
          let data4 = {
            "PromotionId": item.productPromotionsId,
            "AddItems": selectedPromotionData4
          }
          this.promotionstype4.push(data4);
        
          break;
        default:
          break;
      }

    });
    // to get all promotions in common res
    let allopromotions: any = [...this.promotionstype1, ...this.promotionstype2, ...this.promotionstype3, ...this.promotionstype4];


    let data = {
      "GeographyId": this.geographyId,
      "details": allopromotions,
      "Dealerid": this.dealerid,
    }
    console.log('data', data);


    this.orders.addorderPromotionsdata(data).subscribe(
      {
        next: (res: any) => {
          if (res) {
            console.log(res.response, "response after adding item in promotions");
    //  localStorage.setItem('PromotionType',res.response[0].promotionTypeNmae)
    localStorage.setItem('PromotionName',res.response[0].promotionName);
    localStorage.setItem('PromotionTypeName',res.response[0].promotionTypeNmae);

            this.dialogRef.close(res.response);
          

           
          }
          
        },
        error: (err: any) => {

        }
      });
      
    }
  
  
    

totatQty(event:any) {
alert(event);
}

clearQuantity()
{
//   this.Item.quantity=null;
//   this.Item.quantity='';
//  this.quantityadd='';
//   this.quantityadd = this.initialValue;
  
}
Item = { Quantity: 0 };
displayedValue: number = 0;
updateValue(value: number) {
  this.displayedValue = value;
}


getTotalSelectedQuantity(promos: any): number {
  if (!promos || !promos.stockitemid) {
      return 0;
  }
  let totalSelected = 0;
  for (const Item of promos.stockitemid) {
      if (Item.isProductSelected) {
          totalSelected += Item.Quantity;
      }
  }
  return totalSelected;
}

moqselectedreamining(promos: any): number {
  if (!promos || !promos.stockitemid) {
      return 0;
  }
  let totalSelected = 0;
  for (const Item of promos.stockitemid) {
      if (Item.isProductSelected) {
          totalSelected += Item.Quantity;
      }
  }
  return totalSelected;
}


moqselectedreaminingFORTHPromotion(promos: any): number {
  if (!promos || !promos.stockitemid) {
      return 0;
  }
  let totalSelected = 0;
  for (const Item of promos.stockitemid) {
      if (Item.isProductSelected) {
          totalSelected += Item.Quantity;
      }
  }
  return totalSelected;
}

// selected

// toggleState: boolean = false;

// toggleData(updatedItem) {
//   this.toggleState = !this.toggleState;

//   if (this.toggleState) {
//     this.ProductPromotionOrderList = this.ProductPromotionOrderList?.filter(
//       (Item) => Item.promoDetails?.stockitemid?.isProductSelected
//     );
//   } else {
//     this.ProductPromotionOrderList
//   }
// }


// new

toggleState: boolean = false;
// toggleData(updatedItem,data:any) {
//   this.toggleState = !this.toggleState;
//   if (this.toggleState == true) {
//     debugger
//     this.ProductPromotionOrderList = this.ProductPromotionOrderList.filter(item => item.isPromotionSelected);
//     console.log(this.promoDetails.stockitemname);
    
//   }
//   else {
    
//     this.ProductPromotionOrderList
    
//       this.quantityChange(updatedItem,data);
  
//   }
  
// }

toggleData(data:any,item:any) {

  this.toggleState = !this.toggleState;
  if (this.toggleState) {
    this.ProductPromotionOrderList = this.ProductPromotionOrderList?.filter(
      (Item) => Item.promoDetails?.stockitemid?.isProductSelected
    );
  } else {
    this.ProductPromotionOrderList
  }
}



getTotalEntitledSelectedRemaining(promos: any): number {
  if (!promos || !promos.stockitemid) {
      return 0;
  }
  let totalSelected = 0;
  for (const Item of promos.stockitemid) {
      if (Item.isProductSelected) {
          totalSelected += Item.Quantity;
      }
  }
  return totalSelected;
}

}
