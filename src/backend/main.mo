import List "mo:core/List";
import Runtime "mo:core/Runtime";

actor {
  type RestaurantInfo = {
    name : Text;
    tagline : Text;
    address : Text;
    phone : Text;
    email : Text;
    openingHours : Text;
  };

  type ContactMessage = {
    name : Text;
    email : Text;
    message : Text;
  };

  let contactMessages = List.empty<ContactMessage>();

  var restaurant : ?RestaurantInfo = null;

  public shared ({ caller }) func setRestaurantInfo(name : Text, tagline : Text, address : Text, phone : Text, email : Text, openingHours : Text) : async () {
    restaurant := ?{
      name;
      tagline;
      address;
      phone;
      email;
      openingHours;
    };
  };

  public query ({ caller }) func getRestaurantInfo() : async RestaurantInfo {
    switch (restaurant) {
      case (null) { Runtime.trap("Restaurant info is not set.") };
      case (?info) { info };
    };
  };

  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, message : Text) : async () {
    let newMessage : ContactMessage = {
      name;
      email;
      message;
    };
    contactMessages.add(newMessage);
  };

  public query ({ caller }) func getContactMessages() : async [ContactMessage] {
    contactMessages.toArray();
  };
};
