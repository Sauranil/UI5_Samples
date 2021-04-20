sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"sap/m/MessageBox"
	],

	function (Controller, Filter, FilterOperator, MessageBox) {
		"use strict";

		return Controller.extend("UI5_.TableFunctions.controller.View1", {
			onInit: function () {
				this.getView().byId("ID_BUKRS").setEditable(false);
				this.getView().byId("ID_LIFNR").setEditable(false);
				this.getView().byId("ID_BSTYP").setEditable(false);
				this.getView().byId("ID_BSART").setEditable(false);
				this.getView().byId("ID_BSAKZ").setEditable(false);
			},

			//Search Method for PO Number
			onSearchPO: function (oEvent) {
				var sQuery = oEvent.getParameter("query");
				var aFilter = [];

				if (sQuery && sQuery.length > 0) {
					//Adding leading zeros while searching					
					while (sQuery.length < 10) {
						sQuery = "0" + sQuery;
					}

					aFilter.push(new Filter("EBELN", FilterOperator.EQ, sQuery));
				}

				var oTable = this.getView().byId("PO_Table_ID");
				oTable.getBinding("items").filter(aFilter);
			},

			//Search Method for Vendor Number
			onSearchVendor: function (oEvent) {
				var sQuery = oEvent.getParameter("query");
				var aFilter = [];

				if (sQuery && sQuery.length > 0) {
					//Adding leading zeros while searching					
					while (sQuery.length < 10) {
						sQuery = "0" + sQuery;
					}

					aFilter.push(new Filter("LIFNR", FilterOperator.EQ, sQuery));
				}

				var oTable = this.getView().byId("PO_Table_ID");
				oTable.getBinding("items").filter(aFilter);
			},

			//Get Method for PO Number
			onGet: function (oEvent) {
				var sPONumber = this.getView().byId("ID_EBELN").getValue(); //Getting PO Number
				if (sPONumber && sPONumber.length > 0) {
					var sURL = "/POHeaderSet(EBELN='" + sPONumber + "')"; //Creating OData Service READ Method URL with key fields
					//	var oModel = new sap.ui.model.odata.ODataModel(sURL);  //This will be used when we are using multiple OData services in same application
					var oModel = this.getView().getModel(); //It calls default OData Service

					var localObj = this; //local object for odata object
					oModel.read(sURL, {
						success: function (oData, oResponse) { //Calling OData Service READ Method & Getting data in oData Variable
							localObj.getView().byId("ID_EBELN").setValue(oData.EBELN); //Assigning OData Value to View Field
							localObj.getView().byId("ID_BUKRS").setValue(oData.BUKRS); //Assigning OData Value to View Field
							localObj.getView().byId("ID_LIFNR").setValue(oData.LIFNR); //Assigning OData Value to View Field
							localObj.getView().byId("ID_ERNAM").setValue(oData.ERNAM); //Assigning OData Value to View Field
							localObj.getView().byId("ID_BSTYP").setValue(oData.BSTYP); //Assigning OData Value to View Field
							localObj.getView().byId("ID_BSART").setValue(oData.BSART); //Assigning OData Value to View Field
							localObj.getView().byId("ID_BSAKZ").setValue(oData.BSAKZ); //Assigning OData Value to View Field
						},

						error: function (oResponse) { //OData Error Response
							MessageBox.error("No Data Found");
						}

					});
				} else {
					MessageBox.error("Please Enter PO Number");
				}
			},

			//Create Method for PO
			onCreate: function () {
				var oInput = {};

				oInput.EBELN = this.getView().byId("ID_EBELN").getValue();

				if (oInput.EBELN && oInput.EBELN.length > 0) {
					var select = {};
					var selectedItem = {};

					oInput.BUKRS = this.getView().byId("ID_BUKRS").getValue();
					oInput.LIFNR = this.getView().byId("ID_LIFNR").getValue();
					oInput.ERNAM = this.getView().byId("ID_ERNAM").getValue();
					//oInput.BSTYP = this.getView().byId("ID_BSTYP").getValue();
					select = this.getView().byId("ID_BSTYP");
					selectedItem = select.getSelectedItem();
					oInput.BSTYP = selectedItem.getKey();

					//oInput.BSART = this.getView().byId("ID_BSART").getValue();
					select = this.getView().byId("ID_BSART");
					selectedItem = select.getSelectedItem();
					oInput.BSART = selectedItem.getKey();

					//oInput.BSAKZ = this.getView().byId("ID_BSAKZ").getValue();
					select = this.getView().byId("ID_BSAKZ");
					selectedItem = select.getSelectedItem();
					oInput.BSAKZ = selectedItem.getKey();

					var oModel = this.getView().getModel(); //It calls default OData Service
					var sURL = "/POHeaderSet"; //OData Service Create Method URL

					oModel.create(
						sURL,
						oInput, {
							success: function (oData, oResponse) { //Calling OData Service CREATE Method
								MessageBox.success("PO has been created successfully");
							},

							error: function (oResponse) { //OData Error Response
								MessageBox.error("Record already exist with same PO Number. Please enter new PO Number");
							}
						});
				} else {
					MessageBox.error("Please Enter PO Number");
				}
			},

			//Update Method for PO
			onUpdate: function () {
				var oUpdate = {};

				oUpdate.EBELN = this.getView().byId("ID_EBELN").getValue();

				if (oUpdate.EBELN && oUpdate.EBELN.length > 0) {
					var select = {};
					var selectedItem = {};

					oUpdate.BUKRS = this.getView().byId("ID_BUKRS").getValue();
					oUpdate.LIFNR = this.getView().byId("ID_LIFNR").getValue();
					oUpdate.ERNAM = this.getView().byId("ID_ERNAM").getValue();
					//oUpdate.BSTYP = this.getView().byId("ID_BSTYP").getValue();
					select = this.getView().byId("ID_BSTYP");
					selectedItem = select.getSelectedItem();
					oUpdate.BSTYP = selectedItem.getKey();

					//oUpdate.BSART = this.getView().byId("ID_BSART").getValue();
					select = this.getView().byId("ID_BSART");
					selectedItem = select.getSelectedItem();
					oUpdate.BSART = selectedItem.getKey();

					//oUpdate.BSAKZ = this.getView().byId("ID_BSAKZ").getValue();
					select = this.getView().byId("ID_BSAKZ");
					selectedItem = select.getSelectedItem();
					oUpdate.BSAKZ = selectedItem.getKey();

					var oModel = this.getView().getModel(); //It calls default OData Service
					var sURL = "/POHeaderSet(EBELN='" + oUpdate.EBELN + "')"; //Creating OData Service UPDATE Method URL with key fields

					oModel.update(
						sURL,
						oUpdate, {
							success: function (oData, oResponse) { //Calling OData Service UPDATE Method
								MessageBox.success("PO has been updated successfully");
							},

							error: function (oResponse) { //OData Error Response
								MessageBox.error("PO Number Does Not Exist. Please Enter Valid PO Number");
							}
						});
				} else {
					MessageBox.error("Please Enter PO Number");
				}
			},

			//Delete Method for PO
			onDelete: function () {
				var sPONumber = this.getView().byId("ID_EBELN_DEL").getValue(); //Getting PO Number
				if (sPONumber && sPONumber.length > 0) {
					var sURL = "/POHeaderSet(EBELN='" + sPONumber + "')"; //Creating OData Service READ Method URL with key fields
					//	var oModel = new sap.ui.model.odata.ODataModel(sURL);  //This will be used when we are using multiple OData services in same application	
					var oModel = this.getView().getModel(); //It calls default OData Service

					oModel.remove(
						sURL, {
							success: function (oData, oResponse) { //Calling OData Service DELETE Method
								MessageBox.success("PO has been deleted successfully");
							},

							error: function (oResponse) { //OData Error Response
								MessageBox.error("PO Number Does Not Exist. Please Enter Valid PO Number");
							}
						});

				} else {
					MessageBox.error("Please Enter PO Number");
				}
			},

			//Toggle Edit Method for PO
			onEdit: function () {
				this.getView().byId("Edit_B1").setVisible(false);
				this.getView().byId("Cancel_B5").setVisible(true);
				this.getView().byId("ID_BUKRS").setEditable(true);
				this.getView().byId("ID_LIFNR").setEditable(true);
				this.getView().byId("ID_BSTYP").setEditable(true);
				this.getView().byId("ID_BSART").setEditable(true);
				this.getView().byId("ID_BSAKZ").setEditable(true);

			},

			//Toggle Cancel Method for PO
			onCancel: function () {
				this.getView().byId("Edit_B1").setVisible(true);
				this.getView().byId("Cancel_B5").setVisible(false);
				this.getView().byId("ID_BUKRS").setEditable(false);
				this.getView().byId("ID_LIFNR").setEditable(false);
				this.getView().byId("ID_BSTYP").setEditable(false);
				this.getView().byId("ID_BSART").setEditable(false);
				this.getView().byId("ID_BSAKZ").setEditable(false);
			}
		});

	});